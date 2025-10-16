import { Router } from "express";
import auth from "./auth.routes";
import posts from "./posts.routes";
import comments from "./comments.routes";


const api = Router();
api.use("/auth", auth);
api.use("/posts", posts);
api.use("/comments", comments);
export default api;