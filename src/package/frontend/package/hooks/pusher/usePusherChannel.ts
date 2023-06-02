import type { Channel } from "pusher-js";
import type Pusher from "pusher-js";
import { createSignal, onCleanup, onMount } from "solid-js";

export function usePusherChannel(name: string, pusher: Pusher) {
  const [channel, setChannel] = createSignal<Channel>();

  function teardown() {
    channel()?.unbind_all();
    channel()?.unsubscribe();
  }

  onMount(() => {
    console.log("subscribing to:", name);
    setChannel(pusher.subscribe(name));
  });

  onCleanup(teardown);

  return {
    channel,
    unsubscribe: teardown,
  };
}
