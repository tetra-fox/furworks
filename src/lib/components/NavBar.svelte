<script lang="ts">
  let scrolled = false;
</script>

<svelte:window on:scroll={() => (scrolled = window.scrollY > 0)} />

<nav
  class={[
    "t-0 l-0 fixed z-50 flex w-full items-center justify-between transition-all duration-200 ease-in-out select-none",
    scrolled ? "bg-neutral-900 p-4" : "bg-transparent p-12"
  ]}>
  <a href="/" class="group relative flex justify-center gap-2 text-neutral-200">
    <div class="bg-fit size-8 bg-[url('/img/fwks.svg')] bg-center bg-no-repeat"></div>
    <h1 class="text-furworks text-3xl">FURWORKS</h1>
    <span class="text-furworks underline"></span>
  </a>
  <div class="flex gap-4">
    <a href="/attend" class="group relative text-neutral-200">
      ATTEND
      <span class="underline"></span>
    </a>
    <a href="/about" class="group relative text-neutral-200">
      ABOUT
      <span class="underline"></span>
    </a>
  </div>
</nav>

<style lang="postcss">
  @reference "tailwindcss/theme";

  .underline {
    @apply absolute bottom-0.5 left-0 block h-[1px] w-0 bg-current transition-all ease-in-out group-hover:w-full;
  }
</style>
