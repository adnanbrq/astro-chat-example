import pusherClient from "@frontend/infrastructure/socket/pusher-client";
import { usePusherChannel } from "@frontend/package/hooks/pusher/usePusherChannel";
import { usePusherEvent } from "@frontend/package/hooks/pusher/usePusherEvent";
import { For, createSignal } from "solid-js";
import type { ChannelView } from "@backend/package/view/channel.view";
import type { MessageView } from "@backend/package/view/message.view";
import { z } from "zod";
import { Message } from "./Message";

type HistoryProps = {
  channelId: ChannelView["id"];
  messages: MessageView[];
};

const PusherNewMessageSchema = z.object({
  id: z.number(),
});

export function History({ channelId, messages }: HistoryProps) {
  const [messageIds, setMessageIds] = createSignal<number[]>([]);
  const { channel } = usePusherChannel(`channel-${channelId}`, pusherClient);

  usePusherEvent("new-message", channel, (data) => {
    const parse = PusherNewMessageSchema.safeParse(data);
    if (parse.success) {
      setMessageIds((old) => [...old, parse.data.id]);
    }
  });

  return (
    <ul class="flex flex-col h-full overflow-x-auto">
      <li>
        <p class="py-1 px-3 text-sm text-white bg-blue-500 rounded select-none inline-block m-4 mb-0">
          SolidJS
        </p>
      </li>
      <For each={messages}>
        {(item) => (
          <li class="w-full">
            <Message channelId={channelId} messageId={item.id} message={item} />
          </li>
        )}
      </For>

      <For each={Array.from(messageIds().values())}>
        {(item) => (
          <li class="w-full">
            <Message channelId={channelId} messageId={item} />
          </li>
        )}
      </For>
    </ul>
  );
}
