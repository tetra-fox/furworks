<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import NavBar from "$lib/components/NavBar.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
  <NavBar />
  <main class="flex-grow">
    {@render children()}
  </main>
  <Footer />
</div>
