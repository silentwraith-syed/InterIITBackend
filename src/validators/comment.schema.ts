import { z } from "zod";


export const createCommentSchema = z.object({
postId: z.string(),
parentId: z.string().nullable().optional(),
text: z.string().min(1).max(5000),
});


export const upvoteSchema = z.object({ id: z.string() });