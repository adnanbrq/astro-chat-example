<script lang="ts">
  import pusherClient from "@frontend/infrastructure/socket/pusher-client";
  import type { Channel } from "pusher-js";
  import { onMount } from "solid-js";
  import type { ChannelView } from "@backend/package/view/channel.view";
  import { onDestroy } from "svelte";
  import ChannelSelector from "./ChannelSelector.svelte";
  import { z } from "zod";
  import { ChannelAPI } from "@frontend/package/api/channel.api";

  // Data
  const PusherNewChannelSchema = z.object({
    id: z.string().min(1),
  });

  // Props
  export let channels: ChannelView[];
  export let currentId: ChannelView["id"];

  // Data
  let newChannels: string[] = [];
  let pusherChannel: Channel;
  let newChannelName: string = "";

  // Lifecycle
  onMount(() => {
    pusherChannel = pusherClient.subscribe("channels");
    pusherChannel.bind("new-channel", (event: unknown) => {
      const parse = PusherNewChannelSchema.safeParse(event);
      if (parse.success) {
        newChannels = [...newChannels, parse.data.id];
      }
    });
  });

  onDestroy(() => {
    if (pusherChannel) {
      pusherChannel.unbind("new-channel");
      pusherChannel.unsubscribe();
    }
  });

  async function onSignOut() {
    fetch("/api/session", { method: "delete" }).then((res) => {
      if (res.status === 200) {
        window.location.href = "/";
      } else {
        alert("SignOut Failed");
      }
    });
  }
</script>

<div
  class="flex flex-col justify-between w-64 p-4 border-r border-zinc-100 h-full"
>
  <p
    class="py-1 px-3 text-sm text-white bg-amber-500 rounded mb-2 select-none inline-block self-start"
  >
    Svelte
  </p>
  <h1 class="text-xl font-medium mb-10">Channels</h1>

  <ul class="flex flex-col space-y-1 flex-1">
    {#each channels as channel}
      <li>
        <ChannelSelector
          id={channel.id}
          {channel}
          isActive={currentId === channel.id}
        />
      </li>
    {/each}

    {#each newChannels as id}
      <li>
        <ChannelSelector {id} isActive={currentId === id} channel={undefined} />
      </li>
    {/each}

    <li class="pt-4">
      <input
        bind:value={newChannelName}
        on:keyup|preventDefault={(e) => {
          if (e.key === "Enter") {
            ChannelAPI.createChannel({ name: newChannelName }).then(() => {
              newChannelName = "";
            });
          }
        }}
        type="text"
        id="channelName"
        name="channelName"
        placeholder="Channel name"
        required
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </li>
  </ul>

  <button
    class="flex w-full justify-center rounded-md bg-brand px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brand-brighter focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    on:click|preventDefault={onSignOut}>Abmelden</button
  >
</div>
