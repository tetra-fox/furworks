<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { quintOut, cubicOut } from "svelte/easing";
  import { clickoutside } from "@svelte-put/clickoutside";

  interface Props {
    options: { value: string; label: string; icon: string }[];
    value: string;
    name: string;
    class?: string;
  }

  let { options, value = $bindable(), name, class: className = "" }: Props = $props();

  let isOpen = $state(false);
  let selectedOption = $derived(options.find((opt) => opt.value === value) || options[0]);
  let focusedIndex = $state(0);

  const handleSelect = (option: { value: string; label: string; icon: string }) => {
    value = option.value;
    isOpen = false;
    focusedIndex = 0;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusedIndex = (focusedIndex + 1) % options.length;
        break;
      case "ArrowUp":
        e.preventDefault();
        focusedIndex = (focusedIndex - 1 + options.length) % options.length;
        break;
      case "Enter":
        e.preventDefault();
        if (isOpen) {
          handleSelect(options[focusedIndex]);
        } else {
          isOpen = true;
        }
        break;
      case "Escape":
        e.preventDefault();
        isOpen = false;
        focusedIndex = 0;
        break;
      default:
        if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
          e.preventDefault();
          const nextIndex = options.findIndex(
            (opt, idx) =>
              idx > focusedIndex && opt.label.toLowerCase().startsWith(e.key.toLowerCase())
          );
          if (nextIndex !== -1) {
            focusedIndex = nextIndex;
          } else {
            const firstMatch = options.findIndex((opt) =>
              opt.label.toLowerCase().startsWith(e.key.toLowerCase())
            );
            if (firstMatch !== -1) {
              focusedIndex = firstMatch;
            }
          }
        }
    }
  };

  $effect(() => {
    if (isOpen) {
      focusedIndex = options.findIndex((opt) => opt.value === value);
    }
  });
</script>

<div
  role="combobox"
  aria-controls="dropdown-list"
  aria-expanded={isOpen}
  class="relative {className}"
  use:clickoutside
  onclickoutside={() => {
    isOpen = false;
    focusedIndex = 0;
  }}>
  <button
    type="button"
    tabindex="0"
    aria-label="Select option"
    class="focus:ring-furworks flex w-full items-center justify-between rounded-l-md border border-neutral-800 bg-neutral-900 px-3 py-3 text-sm focus:ring-1 focus:outline-none"
    onclick={(e) => {
      e.stopPropagation();
      isOpen = !isOpen;
    }}
    onblur={() => {
      setTimeout(() => {
        isOpen = false;
        focusedIndex = 0;
      }, 200);
    }}
    onkeydown={handleKeyDown}>
    <div class="flex items-center gap-2">
      <span class={`icon-[${selectedOption.icon}] size-5`}></span>
    </div>
    <span
      class={[
        "icon-[material-symbols--arrow-drop-down-rounded] size-5 transition-transform",
        isOpen ? "rotate-180" : ""
      ]}></span>
  </button>

  {#if isOpen}
    <div
      id="dropdown-list"
      in:slide={{ duration: 200, easing: quintOut }}
      out:slide={{ duration: 200, easing: cubicOut }}
      class="ring-opacity-5 absolute left-0 z-10 mt-1 min-w-[200px] origin-top-left rounded-md border border-neutral-800 bg-neutral-900 shadow-lg ring-1 ring-black">
      <ul class="max-h-60 overflow-auto py-1">
        {#each options as option, i}
          <li>
            <button
              type="button"
              tabindex="-1"
              class={[
                "flex w-full items-center gap-2 px-4 py-2.5 text-sm hover:bg-neutral-800",
                i === focusedIndex && "bg-neutral-800"
              ]}
              onclick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}>
              <span class={`icon-[${option.icon}] size-4`}></span>
              <span>{option.label}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <input type="hidden" {name} {value} />
</div>
