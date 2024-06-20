import type {Channel} from "pusher-js";
import {createEffect, onCleanup} from "solid-js";

export type Accessor<T> = () => T;
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
