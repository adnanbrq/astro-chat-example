import { MessageAPI } from "@frontend/package/api/message.api";
import { format } from "date-fns";
import { Show, createSignal, onMount } from "solid-js";
import type { ChannelView } from "@backend/package/view/channel.view";
import type { MessageView } from "@backend/package/view/message.view";
import { Optional } from "typescript-optional";

type Props = {
  channelId: ChannelView["id"];
  messageId: MessageView["id"];
  message?: MessageView;
};

export function Message({ message, messageId, channelId }: Props) {
  const [data, setData] = createSignal<Optional<MessageView>>(
    Optional.ofNullable(message)
  );

  onMount(() => {
    if (typeof message === "undefined") {
      MessageAPI.getMessage({ channelId, messageId }).then(setData);
    }
  });

  return (
    <div class="hover:bg-zinc-50 transition-colors p-4">
      <div class="flex space-x-2">
        <Show
          when={data().isPresent()}
          fallback={
            <p class="text-xs text-zinc-400 text-center select-none">Loading</p>
          }
        >
          <img
            src={`https://ui-avatars.com/api/?name=${data()
              .get()
              .authorName.replace(" ", "+")}&background=random`}
            alt="avatar"
            class="w-12 h-12 rounded"
          />

          <div>
            <p class="font-medium text-lg">
              {data().get().authorName}{" "}
              <span class="text-xs text-zinc-400 font-normal">
                ({format(new Date(data().get().createdAt), "dd.MM - HH:mm")})
              </span>
            </p>
            <p>{data().get().content}</p>
          </div>
        </Show>
      </div>
    </div>
  );
}
