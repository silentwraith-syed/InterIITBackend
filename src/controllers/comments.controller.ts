import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createCommentSchema, upvoteSchema } from "../validators/comment.schema";


export async function listCommentsByPost(req: Request, res: Response) {
  const { postId } = req.params;
  if (!postId) return res.status(400).json({ error: "Post ID required" });
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
    include: { user: true },
  });
  res.json(comments);
}
export async function createComment(req: Request, res: Response) {
const parsed = createCommentSchema.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
const { postId, parentId, text } = parsed.data;
const userId = (req as any).user?.sub as string;
if (!userId) return res.status(401).json({ error: "Unauthenticated" });
const created = await prisma.comment.create({ data: { postId, parentId: parentId || null, text, userId } });
res.status(201).json(created);
}


export async function upvoteComment(req: Request, res: Response) {
const parsed = upvoteSchema.safeParse(req.params);
if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
const { id } = parsed.data;
const updated = await prisma.comment.update({ where: { id }, data: { upvotes: { increment: 1 } } });
res.json(updated);
}