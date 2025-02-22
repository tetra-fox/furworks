<script lang="ts">
  export let name: string;
  export let value: string;
  export let group: string;
  export let required: boolean = false;
</script>

<label class="inline-flex items-center space-x-1">
  <input type="radio" {name} {value} bind:group {required} class="peer hidden" />
  <span
    class="border-furworks peer-checked:bg-furworks inline-flex h-5 w-5 items-center justify-center rounded-full border-2">
    <span class="hidden h-2.5 w-2.5 rounded-full bg-white peer-checked:block"></span>
  </span>
  <span>{value}</span>
</label>
