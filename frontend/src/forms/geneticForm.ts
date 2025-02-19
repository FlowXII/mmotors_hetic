import * as z from "zod";

export const categorySchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  products: z.array(z.string()).optional(), 
});