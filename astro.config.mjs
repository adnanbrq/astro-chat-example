import {defineConfig} from "astro/config";
import solidJs from "@astrojs/solid-js";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import node from "@astrojs/node"

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [solidJs(), tailwind(), svelte(), vue()],
});
