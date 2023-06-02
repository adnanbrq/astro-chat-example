import {
  ChannelView,
  ChannelViewSchema,
} from "@backend/package/view/channel.view";
import type { CreateChannelSchema } from "src/pages/api/channels";
import { Optional } from "typescript-optional";
import type { z } from "zod";

export const ChannelAPI = {
  async getChannelById(id: ChannelView["id"]): Promise<Optional<ChannelView>> {
    return fetch(`/api/channels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const parse = ChannelViewSchema.safeParse(data);
        if (!parse.success) {
          return Optional.empty();
        }

        return Optional.ofNonNull(parse.data);
      });
  },

  async createChannel(
    body: z.infer<typeof CreateChannelSchema>
  ): Promise<boolean> {
    return fetch(`/api/channels`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.status === 200);
  },
};
