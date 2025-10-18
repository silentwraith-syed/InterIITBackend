import express from "express";
import cors from "cors";
import api from "./routes";
import { errorHandler } from "./middleware/error";


const app = express();

// CORS - Allow all origins (including Vercel)
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());


app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", api);
app.use(errorHandler);

export default app;
