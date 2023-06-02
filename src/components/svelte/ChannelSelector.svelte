<script lang="ts">
  import { ChannelAPI } from "@frontend/package/api/channel.api";
  import { onMount } from "solid-js";
  import type { ChannelView } from "@backend/package/view/channel.view";
  import { Optional } from "typescript-optional";

  // Props
  export let id: ChannelView["id"];
  export let channel: ChannelView | undefined;
  export let isActive: boolean;

  // Data
  let data: Optional<ChannelView> = Optional.ofNullable(channel);

  // Lifecycle
  onMount(() => {
    if (typeof channel === "undefined") {
      ChannelAPI.getChannelById(id).then((value) => {
        data = value;
      });
    }
  });
</script>

{#if data.isPresent()}
  <a
    href={`/channel/${id}`}
    class={`channel-link ${isActive ? "active" : "inactive"}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5"
    >
      <path
        fill-rule="evenodd"
        d="M9.493 2.853a.75.75 0 00-1.486-.205L7.545 6H4.198a.75.75 0 000 1.5h3.14l-.69 5H3.302a.75.75 0 000 1.5h3.14l-.435 3.148a.75.75 0 001.486.205L7.955 14h2.986l-.434 3.148a.75.75 0 001.486.205L12.456 14h3.346a.75.75 0 000-1.5h-3.14l.69-5h3.346a.75.75 0 000-1.5h-3.14l.435-3.147a.75.75 0 00-1.486-.205L12.045 6H9.059l.434-3.147zM8.852 7.5l-.69 5h2.986l.69-5H8.852z"
        clip-rule="evenodd"
      />
    </svg><span>{data.get().name}</span>
  </a>
{:else}
  <p>Loading</p>
{/if}
