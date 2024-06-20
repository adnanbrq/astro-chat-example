import {format} from "date-fns";
import type {MessageRepository} from "../../database/repository/message.repository";
import type {MessageView} from "../../view/message.view";
import type {MessageController} from "./message.controller";
import {HttpResponse} from "@backend/infrastructure/http/http-response";
import pusherBackend from "@backend/infrastructure/socket/pusher-backend";

type Props = {
  messageRepository: MessageRepository;
};

export function newMessageController({messageRepository}: Props): MessageController {
  return {
    async handleGetMessage(channelId, messageId) {
      try {
        const findMessage = await messageRepository.findById(messageId);
        if (findMessage.isEmpty()) {
          return new Response(null, {status: 404});
        }

        if (findMessage.get().channelId !== channelId) {
          return new Response(null, {status: 404});
        }

        const m = findMessage.get();
        return HttpResponse.json<MessageView>(
          {
            id: m.id,
            content: m.content,
            createdAt: m.createdAt,
            authorName: m.user.name,
          },
          {status: 200}
        );
      } catch (e) {
        console.error(e);
        return new Response(null, {status: 500});
      }
    },

    async handleCreateMessage({channelId, userId, content}) {
      try {
        const message = await messageRepository.persistMessage({
          channelId,
          userId,
          content,
          updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
          createdAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        });

        if (message.isEmpty()) {
          return new Response(null, {status: 403});
        }

        const m = message.get();

        await pusherBackend.trigger(`channel-${m.channelId}`, "new-message", {
          id: m.id,
        });

        return HttpResponse.json<MessageView>({
          id: m.id,
          content: m.content,
          createdAt: m.createdAt,
          authorName: m.user.name,
        });
      } catch (e) {
        console.error(e);
        return new Response(null, {status: 500});
      }
    },
  };
}
