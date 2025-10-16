import { Router } from "express";
import { listPosts, getPostById } from "../controllers/posts.controller";


const router = Router();
router.get("/", listPosts);
router.get("/:id", getPostById);
export default router;