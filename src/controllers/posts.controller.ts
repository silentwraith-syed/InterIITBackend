import { Request, Response } from "express";
import { prisma } from "../lib/prisma";


export async function getPostById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Post ID required" });
  const post = await prisma.post.findUnique({ where: { id }, include: { author: true } });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
}
export async function listPosts(_req: Request, res: Response) {
const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" }, include: { author: true } });
res.json(posts);
}