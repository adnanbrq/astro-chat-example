import { z } from "zod";

export const MessageViewSchema = z.object({
  id: z.number(),
  content: z.string().min(1),
  createdAt: z
    .string()
    .datetime()
    .transform((v) => new Date(v)),
  authorName: z.string().min(1),
});

export type MessageView = z.infer<typeof MessageViewSchema>;
