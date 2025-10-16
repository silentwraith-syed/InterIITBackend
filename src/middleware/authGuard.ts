import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";


export function authGuard(req: Request, res: Response, next: NextFunction) {
const header = req.headers.authorization;
if (!header) return res.status(401).json({ error: "Missing Authorization" });
const token = header.replace("Bearer ", "");
try {
const decoded = jwt.verify(token, env.JWT_SECRET) as any;
(req as any).user = decoded;
next();
} catch {
return res.status(401).json({ error: "Invalid token" });
}
}