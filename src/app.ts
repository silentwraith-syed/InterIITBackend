import express from "express";
import cors from "cors";
import api from "./routes";
import { errorHandler } from "./middleware/error";


const app = express();
app.use(cors());
app.use(express.json());


app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", api);
app.use(errorHandler);
const allowed = process.env.FRONTEND_URL?.split(",").map(s => s.trim()) || ["http://localhost:5173"];
app.use(cors({ origin: allowed, methods: ["GET","POST","PATCH","DELETE","OPTIONS"] }));

export default app;