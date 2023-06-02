<script lang="ts">
import { MessageAPI } from "@frontend/package/api/message.api";
import { ref } from "vue";

export default {
  props: {
    channelId: {
      type: String,
      required: true,
    },
  },
  setup({ channelId }) {
    const content = ref<string>("");
    const onSubmit = async () => {
      MessageAPI.createMessage(channelId, {
        content: content.value,
      }).then(() => (content.value = ""));
    };

    return {
      content,
      onSubmit,
    };
  },
};
</script>

<template>
  <div class="border-t border-zinc-100">
    <p
      class="py-1 px-3 text-sm text-white bg-emerald-400 rounded select-none inline-block m-4 mb-0"
    >
      VueJS
    </p>
    <div class="flex space-x-4 p-4 items-center relative">
      <input
        type="text"
        class="flex w-full border border-zinc-200 rounded p-2"
        v-model="content"
        @keyup.enter="onSubmit"
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
</template>
