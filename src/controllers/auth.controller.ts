import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { env } from "../env";
import { signToken } from "../lib/auth";


export async function login(req: Request, res: Response) {
  const { email, name, avatar } = req.body as { email: string; name?: string; avatar?: string };
  const domain = email?.split("@")[1]?.toLowerCase();
  if (!email || !domain) return res.status(400).json({ error: "Email required" });
  if (!env.ALLOWED_DOMAINS.includes(domain)) return res.status(403).json({ error: "Domain not allowed" });

  const updateData: { name?: string; avatar?: string } = {};
  if (name) updateData.name = name;
  if (avatar) updateData.avatar = avatar;

  const user = await prisma.user.upsert({
    where: { email },
    update: updateData,
    create: { 
      email, 
      name: name || email.split("@")[0] || "User", 
      ...(avatar ? { avatar } : {})
    },
  });

  const token = signToken({ sub: user.id, email: user.email, name: user.name });
  res.json({ token, user });
}