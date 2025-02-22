<script lang="ts">
  import { page } from "$app/state";
</script>

<svelte:head>
  <title>FURWORKS // Error</title>
</svelte:head>

<div class="flex h-full w-full flex-col items-center justify-center">
  <h1 class="mb-4 text-4xl">{page.status}</h1>

  <h2 class="text-xl">{page.error.message}</h2>
</div>
