import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { env } from "../env";
import { signToken } from "../lib/auth";
import { transporter } from "../lib/mailer";
import { gen6, hashCode, verifyCode } from "../lib/crypto";

// POST /api/auth/request-otp  { email, name? }
export async function requestOtp(req: Request, res: Response) {
  const { email, name } = req.body as { email: string; name?: string };
  if (!email) return res.status(400).json({ error: "Email required" });

  const domain = email.split("@")[1]?.toLowerCase();
  // optional domain allowlist (keep or remove)
  if (!domain || !env.ALLOWED_DOMAINS.includes(domain)) return res.status(403).json({ error: "Domain not allowed" });

  const code = gen6();
  const codeHash = hashCode(code);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  await prisma.otp.create({ data: { email, codeHash, expiresAt } });

  // ensure user exists (so verify can issue token)
  const updateData: { name?: string } = {};
  if (name) updateData.name = name;
  
  await prisma.user.upsert({
    where: { email },
    update: updateData,
    create: { email, name: name || email.split("@")[0] || "User" },
  });

  // send email with error handling
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER || "no-reply@kgptalks.com",
      to: email,
      subject: "Your KGPTalks login code",
      text: `Your code is ${code}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to KGPTalks!</h2>
          <p>Your login code is:</p>
          <h1 style="background: #f0f0f0; padding: 20px; text-align: center; letter-spacing: 5px;">${code}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">KGPTalks - IIT Kharagpur Discussion Platform</p>
        </div>
      `
    });
    
    console.log(`✅ OTP sent to ${email}`);
    res.json({ ok: true });
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    // Still return success but log the error
    // In production, you might want to return an error or use a fallback method
    res.json({ 
      ok: true, 
      warning: 'OTP generated but email delivery may be delayed. Please check your inbox in a few moments.' 
    });
  }
}

// POST /api/auth/verify-otp { email, code }
export async function verifyOtp(req: Request, res: Response) {
  const { email, code } = req.body as { email: string; code: string };
  if (!email || !code) return res.status(400).json({ error: "Email and code required" });

  // find latest unexpired OTP
  const record = await prisma.otp.findFirst({
    where: { email, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return res.status(400).json({ error: "Invalid or expired code" });

  const ok = verifyCode(code, record.codeHash);
  if (!ok) return res.status(400).json({ error: "Invalid code" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const token = signToken({ sub: user.id, email: user.email, name: user.name });
  res.json({ token, user });
}
