import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { env } from "../env";
import { signToken } from "../lib/auth";
import { hashCode, verifyCode } from "../lib/crypto";

// POST /api/auth/register  { email, password, name? }
export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body as { email: string; password: string; name?: string };
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain || !env.ALLOWED_DOMAINS.includes(domain)) {
    return res.status(403).json({ error: "Domain not allowed" });
  }

  // Check if user already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash password
  const passwordHash = hashCode(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name: name || email.split("@")[0] || "User",
    },
  });

  // Generate token
  const token = signToken({ sub: user.id, email: user.email, name: user.name });

  res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
  });
}

// POST /api/auth/login { email, password }
export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  // Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Verify password
  const isValid = verifyCode(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate token
  const token = signToken({ sub: user.id, email: user.email, name: user.name });

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
  });
}
