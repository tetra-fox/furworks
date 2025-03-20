<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import { slide, fade } from "svelte/transition";
  import { quintOut, cubicOut } from "svelte/easing";
  import RadioButton from "$lib/components/forms/RadioButton.svelte";
  import Checkbox from "$lib/components/forms/Checkbox.svelte";
  import SocialDropdown from "$lib/components/forms/SocialDropdown.svelte";

  import RegistrationSchema from "$lib/components/forms/RegistrationSchema";

  let { data, form }: PageProps = $props();

  let selectedOption = $state("");
  let phoneNumber = $state("");
  let selectedSocial = $state("Bluesky");

  const socialPlatforms = [
    { value: "Bluesky", label: "Bluesky", icon: "fa6-brands--bluesky" },
    { value: "Twitter", label: "Twitter", icon: "fa6-brands--twitter" },
    { value: "Instagram", label: "Instagram", icon: "fa6-brands--instagram" }
  ];

  let agreeAge = $state(false);
  let agreeCOC = $state(false);
  let agreeLiability = $state(false);
  let allAgreed = $derived(agreeAge && agreeCOC && agreeLiability);

  const formatPhoneNumber = () => {
    const rawNumber = phoneNumber.replace(/\D/g, ""); // remove non-digits

    let formattedNumber = "";

    if (rawNumber.length > 0) {
      formattedNumber += `(${rawNumber.slice(0, 3)}`;
    }
    if (rawNumber.length > 3) {
      formattedNumber += `) ${rawNumber.slice(3, 6)}`;
    }
    if (rawNumber.length > 6) {
      formattedNumber += `-${rawNumber.slice(6, 10)}`;
    }

    phoneNumber = formattedNumber;
  };
</script>

<svelte:head>
  <title>FURWORKS // Register</title>
</svelte:head>

<section class="mx-auto max-w-3xl space-y-8">
  <div class="space-y-2">
    <h1 class="text-4xl font-bold">Register</h1>
    <p class="text-furworks-red text-sm">* indicates required field</p>
  </div>

  <form method="POST" use:enhance class="space-y-8">
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="space-y-2">
        <label for="first-name">First Name*</label>
        <input
          type="text"
          name="first_name"
          id="first-name"
          required
          class="rounded-md border border-neutral-800" />
      </div>
      <div class="space-y-2">
        <label for="last-name">Last Name*</label>
        <input
          type="text"
          name="last_name"
          id="last-name"
          required
          class="rounded-md border border-neutral-800" />
      </div>
      <div class="space-y-2">
        <label for="preferred-name">Preferred Name</label>
        <input
          type="text"
          name="preferred_name"
          id="preferred-name"
          class="rounded-md border border-neutral-800" />
      </div>
      <div class="space-y-2">
        <label for="pronouns">Pronouns</label>
        <input
          type="text"
          name="pronouns"
          id="pronouns"
          class="rounded-md border border-neutral-800" />
      </div>
      <div class="space-y-2">
        <label for="social">Social*</label>
        <div class="flex w-full">
          <SocialDropdown
            options={socialPlatforms}
            bind:value={selectedSocial}
            name="social_platform"
            class="w-1/4" />
          <input
            type="text"
            name="social_handle"
            id="social_handle"
            placeholder="@username"
            maxlength="16"
            required
            class="focus:ring-furworks w-3/4 rounded-l-none rounded-r-md border border-l-0 border-neutral-800 bg-neutral-900 p-3 text-sm transition-colors duration-75 ease-out outline-none focus:ring" />
        </div>
      </div>
      <div class="space-y-2">
        <label for="telegram">Telegram*</label>
        <input
          type="text"
          name="telegram"
          id="telegram"
          placeholder="@username"
          maxlength="33"
          required
          class="rounded-md border border-neutral-800" />
      </div>
      <div class="space-y-2">
        <label for="phone">Phone Number*</label>
        <input
          type="text"
          name="phone"
          id="phone"
          bind:value={phoneNumber}
          oninput={formatPhoneNumber}
          placeholder="(000) 000-0000"
          required
          maxlength="14"
          class="rounded-md border border-neutral-800" />
      </div>
      <div class="space-y-2">
        <label for="email">Email Address*</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your@mom.com"
          required
          class="rounded-md border border-neutral-800" />
      </div>
    </div>

    <fieldset class="space-y-3">
      <legend class="mb-2 text-lg font-medium">How did you hear about us?</legend>
      <div class="space-y-2">
        <RadioButton name="how_referred" bind:group={selectedOption} value="bluesky" required
          >Bluesky</RadioButton>
        <RadioButton name="how_referred" bind:group={selectedOption} value="twitter" required
          >Twitter</RadioButton>
        <RadioButton name="how_referred" bind:group={selectedOption} value="instagram" required
          >Instagram</RadioButton>
        <RadioButton name="how_referred" bind:group={selectedOption} value="word_of_snout" required
          >Word of Snout</RadioButton>
        <RadioButton name="how_referred" bind:group={selectedOption} value="other" required
          >Other</RadioButton>
      </div>
      {#if selectedOption === "other"}
        <div
          in:slide={{ duration: 200, easing: quintOut }}
          out:slide={{ duration: 200, easing: cubicOut }}
          class="overflow-visible">
          <div
            in:fade={{ duration: 150, delay: 50, easing: quintOut }}
            out:fade={{ duration: 150, easing: cubicOut }}
            class="w-full">
            <input
              type="text"
              name="how_referred_other"
              id="other-text"
              placeholder="Please specify"
              required
              class="focus:ring-furworks mt-2 w-full rounded-md border border-neutral-800 bg-neutral-900 p-3 text-sm transition-all duration-200 ease-in-out outline-none focus:ring" />
          </div>
        </div>
      {/if}
    </fieldset>

    <div class="font-ibm-plex-mono space-y-4">
      <Checkbox id="agree_age" required bind:checked={agreeAge}>
        I confirm that I am, or will be, at least 21 years of age at the start of the event, and
        understand that providing false information may result in denial of entry.
      </Checkbox>

      <Checkbox id="agree_coc" required bind:checked={agreeCOC}>
        I have read, understood, and agree to abide by the
        <a href="/code-of-conduct" target="_blank">Code of Conduct</a>.
      </Checkbox>

      <Checkbox id="agree_liability" required bind:checked={agreeLiability}>
        I have read, understood, and agree to the terms of the
        <a href="/liability-waiver" target="_blank">Liability Waiver</a>, including the limits of
        liability described therein.
      </Checkbox>
    </div>

    <div class="pt-4">
      <input type="submit" value="Submit" disabled={!allAgreed} />
    </div>
  </form>

  {#if form?.success}
    <p>submitted :3</p>
  {/if}
</section>

<style lang="postcss">
  @reference "../../../app.css";

  label {
    @apply block text-sm font-medium;
  }

  input[type="text"],
  input[type="email"] {
    @apply ring-furworks w-full bg-neutral-900 p-3 text-sm transition-colors duration-75 ease-out outline-none focus:ring;
  }

  select {
    @apply ring-furworks bg-neutral-900 p-3 text-sm transition-colors duration-75 ease-out focus:ring;
  }

  input[type="submit"] {
    @apply ring-furworks hover:bg-furworks cursor-pointer rounded-md bg-neutral-900 px-8 py-3 text-white transition-colors ease-out outline-none hover:text-neutral-900 focus:ring;
  }

  input[type="submit"][disabled] {
    @apply cursor-not-allowed bg-neutral-800 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-500;
  }

  a {
    @apply hover:text-furworks underline;
  }
</style>
