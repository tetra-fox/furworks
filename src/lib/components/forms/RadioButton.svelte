<script lang="ts">
  export let name: string;
  export let group: string;
  export let required: boolean = false;
  export let value: string;
  export let id: string = `radio-${value}`;
</script>

<label class="flex w-full items-start gap-2" for={id}>
  <input
    type="radio"
    {name}
    bind:group
    {required}
    {value}
    {id}
    class="peer sr-only"
    aria-checked={group === value} />
  <span
    class="peer-checked:bg-furworks peer-checked:border-furworks peer-focus-visible:ring-furworks relative flex size-5 shrink-0 items-center justify-center rounded-full border border-neutral-800
               bg-neutral-900 transition-colors duration-75 ease-out peer-focus-visible:ring-2
               before:absolute before:h-2 before:w-2 before:rounded-full before:bg-neutral-900 before:opacity-0
               before:transition-opacity before:duration-75 before:ease-out peer-checked:before:opacity-100"
    aria-hidden="true">
  </span>
  <span class="flex-1 text-sm leading-5 text-neutral-200">
    <slot />
  </span>
</label>
