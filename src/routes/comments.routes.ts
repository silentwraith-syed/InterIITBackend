import { Router } from "express";
import { listCommentsByPost, createComment, upvoteComment } from "../controllers/comments.controller";
import { authGuard } from "../middleware/authGuard";


const router = Router();
router.get("/post/:postId", listCommentsByPost);
router.post("/", authGuard, createComment);
router.post("/:id/upvote", authGuard, upvoteComment);
export default router;