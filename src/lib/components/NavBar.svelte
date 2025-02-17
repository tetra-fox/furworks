<script lang="ts">
  import { clickoutside } from "@svelte-put/clickoutside";

  let scrollY = $state(0);
  let scrolled = $derived(scrollY > 0);
  let menuOpen = $state(false);
</script>

<svelte:window bind:scrollY />

<nav
  use:clickoutside
  onclickoutside={() => {
    menuOpen = false;
  }}
  class={[
    "fixed top-0 right-0 left-0 z-50 m-6 box-border flex rounded-2xl p-6 transition-all duration-300 ease-out select-none",
    scrolled || menuOpen ? "outline backdrop-blur-md outline-neutral-900 backdrop-brightness-75" : "outline-0 outline-transparent bg-transparent",
    menuOpen ? "flex-col" : "flex items-center justify-between"
  ]}>
  <div class="flex w-full items-center justify-between">
    <!-- branding -->
    <a href="/" class="group relative flex items-center gap-2 text-neutral-200">
      <div class="bg-fit size-6 sm:size-8 bg-[url('/img/fwks.svg')] bg-center bg-no-repeat"></div>
      <h1 class="text-furworks text-2xl sm:text-3xl transform translate-y-[0.15rem]">FURWORKS</h1>
      <span class="text-furworks underline"></span>
    </a>

    <!-- mobile menu button -->
    <button
      class="flex cursor-pointer items-start text-neutral-200 sm:hidden"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Toggle menu">
      <span class="icon-[material-symbols--menu] size-8"></span>
    </button>

    <!-- desktop links -->
    <div class="hidden sm:flex sm:flex-row sm:gap-4">
      <a href="/attend" class="group relative text-neutral-200">
        ATTEND
        <span class="underline"></span>
      </a>
      <a href="/about" class="group relative text-neutral-200">
        ABOUT
        <span class="underline"></span>
      </a>
    </div>
  </div>

  <!-- mobile links -->
  {#if menuOpen}
    <div
      class={[
        "mt-8 flex flex-col items-start justify-center gap-6 overflow-hidden transition-all duration-300",
        menuOpen ? "max-h-[500px]" : "max-h-0"
      ]}>
      <a
        href="/attend"
        class="group relative text-2xl text-neutral-200"
        onclick={() => (menuOpen = false)}>
        ATTEND
        <span class="underline"></span>
      </a>
      <a
        href="/about"
        class="group relative text-2xl text-neutral-200"
        onclick={() => (menuOpen = false)}>
        ABOUT
        <span class="underline"></span>
      </a>
    </div>
  {/if}
</nav>

<style lang="postcss">
  @reference "tailwindcss/theme";

  .underline {
    @apply absolute bottom-0.5 left-0 block h-[1px] w-0 bg-current transition-all ease-in-out group-hover:w-full;
  }
</style>
