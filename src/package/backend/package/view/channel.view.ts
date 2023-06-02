import { z } from "zod";

export const ChannelViewSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
});

export type ChannelView = z.infer<typeof ChannelViewSchema>;
