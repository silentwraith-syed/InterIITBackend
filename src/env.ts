import * as dotenv from "dotenv";
dotenv.config();


export const env = {
PORT: parseInt(process.env.PORT || "4000", 10),
JWT_SECRET: process.env.JWT_SECRET || "devsecret",
ALLOWED_DOMAINS: (process.env.ALLOWED_DOMAINS || "iit.ac.in,interiit.org").split(",").map(s => s.trim().toLowerCase()),
};