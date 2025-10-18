import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { createCommentSchema, upvoteSchema } from "../validators/comment.schema";


export async function listCommentsByPost(req: Request, res: Response) {
  const { postId } = req.params;
  if (!postId) return res.status(400).json({ error: "Post ID required" });
  
  const userId = (req as any).user?.sub as string; // May be undefined if not authenticated
  
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
    include: { 
      user: true,
      upvotedBy: userId ? {
        where: { userId },
        select: { userId: true }
      } : false
    },
  });

  // Add 'upvoted' field to each comment
  const commentsWithUpvoteStatus = comments.map(comment => ({
    ...comment,
    upvoted: userId ? comment.upvotedBy.length > 0 : false,
    upvotedBy: undefined, // Remove the upvotedBy array from response
  }));

  res.json(commentsWithUpvoteStatus);
}
export async function createComment(req: Request, res: Response) {
  const parsed = createCommentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { postId, parentId, text } = parsed.data;
  const userId = (req as any).user?.sub as string;
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });
  
  // Create comment and include user data in response
  const created = await prisma.comment.create({ 
    data: { postId, parentId: parentId || null, text, userId },
    include: {
      user: true // Include user information
    }
  });
  
  res.status(201).json(created);
}


export async function upvoteComment(req: Request, res: Response) {
  const parsed = upvoteSchema.safeParse(req.params);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  
  const { id } = parsed.data;
  const userId = (req as any).user?.sub as string;
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });

  // Check if user has already upvoted this comment
  const existingUpvote = await prisma.commentUpvote.findUnique({
    where: {
      userId_commentId: {
        userId,
        commentId: id,
      },
    },
  });

  if (existingUpvote) {
    // Remove upvote (toggle off)
    await prisma.commentUpvote.delete({
      where: { id: existingUpvote.id },
    });

    // Decrement upvote count
    const updated = await prisma.comment.update({
      where: { id },
      data: { upvotes: { decrement: 1 } },
      include: { user: true },
    });

    return res.json({ ...updated, upvoted: false });
  } else {
    // Add upvote (toggle on)
    await prisma.commentUpvote.create({
      data: {
        userId,
        commentId: id,
      },
    });

    // Increment upvote count
    const updated = await prisma.comment.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
      include: { user: true },
    });

    return res.json({ ...updated, upvoted: true });
  }
}