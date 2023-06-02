import type { Channel } from "pusher-js";
import { Accessor, createEffect, onCleanup } from "solid-js";

type EventHandler = (data: unknown) => void;

export function usePusherEvent(
  name: string,
  channel: Accessor<Channel | undefined>,
  handler: EventHandler
) {
  createEffect(() => {
    if (channel()) {
      channel()?.unbind(name).bind(name, handler);
    }
  }, channel);

  onCleanup(() => {
    channel()?.unbind(name);
  });

  return {
    unsubscribe: channel()?.unbind(name),
  };
}
