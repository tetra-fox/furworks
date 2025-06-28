<script lang="ts">
  const year = new Date().getFullYear(); // runs serverside
</script>

<footer class="font-ibm-plex-mono w-screen bg-neutral-900 text-sm text-neutral-400">
  <div class="container mx-auto flex flex-col gap-6 px-8 py-10 lg:flex-row lg:gap-3">
    <!-- column 1 -->
    <div class="flex flex-1 flex-col items-start">
      <p>FURWORKS is an event produced by BarkWoofJump, LLC.</p>
      <a href="mailto:contact@furworks.club">contact@furworks.club</a>
      <p class="mt-2">Site design by <a href="https://tetra.cool">tetra</a> :3</p>
      <p class="mt-2">&copy; {year} BarkWoofJump, LLC. All rights reserved.</p>
    </div>
    <!-- column 2 -->
    <div class="flex flex-1 flex-col items-start">
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/code-of-conduct">Code of Conduct</a>
      <a href="/liability-waiver">Liability Waiver</a>
    </div>
    <!-- column 3 -->
    <div class="flex flex-1 flex-col items-start">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://bsky.app/profile/furworks.bsky.social">Bluesky</a>
      <a target="_blank" rel="noopener noreferrer" href="https://x.com/thisisfurworks">Twitter</a>
      <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/thisisfurworks"
        >Instagram</a>
      <a target="_blank" rel="noopener noreferrer" href="https://t.me/+sfvbvgLQZGcwYmI5"
        >Telegram</a>
    </div>
  </div>
</footer>

<style lang="postcss">
  a {
    @apply hover:underline;
  }
</style>
