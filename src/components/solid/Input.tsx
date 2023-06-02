import { MessageAPI } from "@frontend/package/api/message.api";
import { createSignal } from "solid-js";
import type { ChannelView } from "@backend/package/view/channel.view";

type Props = {
  channelId: ChannelView["id"];
};

export function Input({ channelId }: Props) {
  const [content, setContent] = createSignal<string>("");

  function onSubmit(e: Event) {
    e.preventDefault();

    MessageAPI.createMessage(channelId, { content: content() }).then(() =>
      setContent("")
    );
  }

  return (
    <div class="border-t border-zinc-100">
      <p class="py-1 px-3 text-sm text-white bg-blue-500 rounded select-none inline-block m-4 mb-0">
        SolidJS
      </p>
      <div class="flex space-x-4 p-4 items-center relative">
        <input
          type="text"
          class="flex w-full border border-zinc-200 rounded p-2"
          value={content()}
          onInput={(e) => setContent(e.currentTarget.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
        />

        <svg
          class="w-5 h-5 transform rotate-45 mb-[2px] absolute right-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
    </div>
  );
}
