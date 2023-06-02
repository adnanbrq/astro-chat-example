import type { ChannelView } from "@backend/package/view/channel.view";
import {
  MessageView,
  MessageViewSchema,
} from "@backend/package/view/message.view";
import type { CreateMessageSchema } from "src/pages/api/channels/[channelId]/messages";
import { Optional } from "typescript-optional";
import type { z } from "zod";

export const MessageAPI = {
  async getMessage(props: {
    channelId: ChannelView["id"];
    messageId: MessageView["id"];
  }): Promise<Optional<MessageView>> {
    return fetch(`/api/channels/${props.channelId}/messages/${props.messageId}`)
      .then((r) => r.json())
      .then((data) => {
        const parse = MessageViewSchema.safeParse(data);
        if (!parse.success) {
          return Optional.empty();
        }

        return Optional.ofNonNull(parse.data);
      });
  },

  async createMessage(
    channelId: ChannelView["id"],
    body: z.infer<typeof CreateMessageSchema>
  ): Promise<boolean> {
    return fetch(`/api/channels/${channelId}/messages`, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => {
      return res.status === 200;
    });
  },
};
