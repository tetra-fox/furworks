<script lang="ts">
  let { children } = $props();
</script>

<article class="prose prose-invert font-manrope container min-w-full">
  {@render children()}
</article>
