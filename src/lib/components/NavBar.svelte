<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import { clickoutside } from "@svelte-put/clickoutside";

  let isRoot = $derived(page.url.pathname === "/");
  let scrollY = $state(0);
  let scrolled = $derived(scrollY > 0);
  let menuOpen = $state(false);
  let innerWidth = $state(0);

  const navLinks = [
    { href: "/register", text: "REGISTER" },
    { href: "/merch", text: "MERCH" }
  ];

  const closeMenu = () => (menuOpen = false);

  // Close menu after any navigation
  afterNavigate(closeMenu);

  // Close menu when window width is at least the sm breakpoint
  $effect(() => {
    if (innerWidth >= 640) closeMenu();
  });
</script>

<svelte:window bind:scrollY bind:innerWidth />

<nav
  use:clickoutside
  onclickoutside={closeMenu}
  class={[
    "fixed top-0 right-0 left-0 z-50 mx-6 box-border flex rounded-2xl px-6 transition-all duration-300 ease-out select-none",
    scrolled || menuOpen
      ? "outline outline-neutral-900 backdrop-blur-md backdrop-brightness-75"
      : "bg-transparent outline-0 outline-transparent",
    isRoot ? "my-6 py-6" : "my-4 py-4"
  ]}
>
  <!-- Branding -->
  <a href="/" class="group relative flex items-center gap-2">
    <div
      class="bg-fit size-6 bg-[url('/img/fwks.svg')] bg-center bg-no-repeat sm:size-8"
    ></div>

    <h1 class="translate-y-[0.15rem] transform text-2xl text-furworks sm:text-3xl">
      FURWORKS
    </h1>

    <span class="text-furworks underline"></span>
  </a>

  <!-- Navigation -->
  <div class="ml-auto flex items-center">
    <!-- Desktop links -->
    <div class="hidden sm:flex sm:gap-4">
      {#each navLinks as link}
        <a href={link.href} class="group relative">
          {link.text}
          <span class="underline"></span>
        </a>
      {/each}
    </div>

    <!-- Mobile menu button -->
    <button
      class="ml-4 flex cursor-pointer items-center sm:hidden"
      onclick={() => (menuOpen = !menuOpen)}
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
      aria-label="Toggle menu"
    >
      <span class="icon-[material-symbols--menu] size-8"></span>
    </button>
  </div>

  <!-- Mobile links -->
  <div
    id="mobile-menu"
    class={[
      "fixed top-[calc(100%+0.5rem)] right-0 flex w-fit flex-col items-end gap-6 overflow-hidden rounded-2xl bg-neutral-900 px-6 py-4 outline outline-neutral-900 transition-all duration-300 sm:hidden",
      menuOpen
        ? "pointer-events-auto translate-y-0 opacity-100"
        : "pointer-events-none -translate-y-2 opacity-0"
    ]}
  >
    {#each navLinks as link}
      <a href={link.href} class="group relative w-fit text-xl">
        {link.text}
        <span class="underline"></span>
      </a>
    {/each}
  </div>
</nav>

<style lang="postcss">
  @reference "tailwindcss/theme";

  .underline {
    @apply absolute bottom-0.5 left-0 block h-[1px] w-0 bg-current transition-all ease-in-out group-hover:w-full;
  }
</style>