import adapter from "@sveltejs/adapter-cloudflare";
import type { Config } from "@sveltejs/kit";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

const config: Config = {
  preprocess: [vitePreprocess(), mdsvex()],
  kit: { adapter: adapter() },
  extensions: [".svelte", ".svx"]
};

export default config;
