import { z } from "zod";
export const paginationSchema = z.object({
cursor: z.string().nullish(),
take: z.coerce.number().min(1).max(50).default(20),
});