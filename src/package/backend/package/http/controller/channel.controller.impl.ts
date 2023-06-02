import { HttpResponse } from "@backend/infrastructure/http/http-response";
import type { ChannelRepository } from "@backend/package/database/repository/channel.repository";
import type { ChannelView } from "@backend/package/view/channel.view";
import type { ChannelController } from "./channel.controller";
import { v4 } from "uuid";
import { format } from "date-fns";
import pusherBackend from "@backend/infrastructure/socket/pusher-backend";

type Props = {
  channelRepository: ChannelRepository;
};

export function newChannelController({
  channelRepository,
}: Props): ChannelController {
  return {
    async handleGetChannel(channelId) {
      try {
        const findChannel = await channelRepository.findChannelById(channelId);
        if (findChannel.isEmpty()) {
          return new Response(null, { status: 404 });
        }

        const c = findChannel.get();
        return HttpResponse.json<ChannelView>(
          {
            id: c.id,
            name: c.name,
          },
          { status: 200 }
        );
      } catch (e) {
        console.error(e);
        return new Response(null, { status: 500 });
      }
    },

    async handleCreateChannel(props) {
      try {
        const channel = await channelRepository.persistChannel({
          id: v4(),
          name: props.name,
          createdAt: format(new Date(), "dd.MM.yyyy"),
          updatedAt: format(new Date(), "dd.MM.yyyy"),
        });

        if (channel.isEmpty()) {
          return new Response(null, { status: 403 });
        }

        await pusherBackend.trigger("channels", "new-channel", {
          id: channel.get().id,
        });

        return new Response(null, { status: 200 });
      } catch (e) {
        console.error(e);
        return new Response(null, { status: 500 });
      }
    },
  };
}
