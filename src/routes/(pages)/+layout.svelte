<script lang="ts">
  import NavBar from "$lib/components/NavBar.svelte";
  import "../../app.css";

  let { children } = $props();
</script>

<NavBar />
<div class="mx-auto mt-32 w-[80%]">
  {@render children()}
</div>
