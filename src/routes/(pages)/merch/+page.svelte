<script lang="ts">
  const productImages = [
    {
      src: "/img/merch/merch-shirt-1.jpg",
      alt: "FURWORKS long sleeve tee product photo 1"
    },
    {
      src: "/img/merch/merch-shirt-2.jpg",
      alt: "FURWORKS long sleeve tee product photo 2"
    },
    {
      src: "/img/merch/merch-shirt-3.jpg",
      alt: "FURWORKS long sleeve tee product photo 3"
    },
    {
      src: "/img/merch/merch-shirt-4.jpg",
      alt: "FURWORKS long sleeve tee product photo 4"
    },
    {
      src: "/img/merch/merch-shirt-5.jpg",
      alt: "FURWORKS long sleeve tee product photo 5"
    },
    {
      src: "/img/merch/furworksttshirtsizeingguide.png",
      alt: "Sizing Guide"
    }

    
  ];

  const features = [
    "Unisex fit",
    "Long sleeve, black base",
    "Glow-in-the-dark green screen print",
    "Unique sleeve designs on both sleeves",
    "Custom tag",
    "Pre-Shrunk"
  ];
</script>

<svelte:head>
  <title>FURWORKS // Merch</title>
  <meta
    name="description"
    content="Explore the FURWORKS Long Sleeve Tee, available for purchase in person at the event."
  />
</svelte:head>

<section class="mx-auto max-w-6xl">
  <header class="mb-12 text-center">
    <p class="mb-3 font-mono text-sm uppercase tracking-[0.25em]">
      Available at the event
    </p>

    <h1 class="text-5xl font-black uppercase md:text-7xl">
      Merch
    </h1>

    <p class="mx-auto mt-6 max-w-2xl text-lg">
      Preview our official FURWORKS merchandise. Online payments are not
      available merchandise can be purchased in person at the event.
    </p>
  </header>

  <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
    <div class="grid gap-4 sm:grid-cols-2">
      {#each productImages as image}
        <figure
          class="overflow-hidden rounded-2xl border border-white/20 bg-neutral-950"
        >
          <img
            src={image.src}
            alt={image.alt}
            class="aspect-square h-full w-full object-cover"
          />
        </figure>
      {/each}
    </div>

    <article>
      <p class="font-mono text-sm uppercase tracking-[0.2em] opacity-70">
        Official FURWORKS merchandise
      </p>

      <h2 class="mt-3 text-4xl font-black uppercase md:text-5xl">
        FURWORKS Long Sleeve Tee
      </h2>

      <p class="mt-6 text-lg leading-relaxed opacity-90">
        Unisex long sleeve tee with glow-in-the-dark green screen print on
        both sleeves. Features unique sleeve prints with a custom logo on the
        left and bold “FURWORKS” branding on the right. Finished with a custom
        interior tag for a polished look.
      </p>

      <div class="mt-8">
        <h3 class="text-xl font-bold uppercase">Features</h3>

        <ul class="mt-4 space-y-3">
          {#each features as feature}
            <li class="flex items-start gap-3">
              <span aria-hidden="true" class="text-furworks">◆</span>
              <span>{feature}</span>
            </li>
          {/each}
        </ul>
      </div>

      <aside
        class="mt-10 rounded-2xl border border-furworks/50 bg-furworks/10 p-6"
      >
        <h3 class="text-xl font-bold uppercase">Purchase in person</h3>

        <p class="mt-2 leading-relaxed">
          Extremely limited quantities available for sale at event, preorder to guarantee a shirt in your size.
        
        </p>
      </aside>
    </article>
  </div>
</section>