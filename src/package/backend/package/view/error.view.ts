import { z } from "zod";

export const ErrorViewSchema = z.object({
  message: z.string().min(1),
});

export type ErrorView = z.infer<typeof ErrorViewSchema>;
