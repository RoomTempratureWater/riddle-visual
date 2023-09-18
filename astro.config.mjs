import { defineConfig } from 'astro/config';
//import tailwind from "@astrojs/tailwind";
import vercel from '@astrojs/vercel/serverless';
import react from "@astrojs/react";


// https://astro.build/configs
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  //integrations: [tailwind(), react()],
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: vercel()
});