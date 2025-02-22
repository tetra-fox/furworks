<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";
  import RadioButton from "$lib/components/forms/RadioButton.svelte";

  let { data, form }: PageProps = $props();

  let selectedOption = $state("");
  let phoneNumber = $state("");

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

<section class="max-w-3xl">
  <h1 class="mb-4 text-4xl">Register</h1>
  <h2 class="text-l mb-2 italic">
    By continuing, you confirm that you are at least 21 years of age.
  </h2>
  <p class="text-furworks-red mb-4 text-xs">* indicates required field</p>
  <form method="POST" use:enhance>
    <div class="mb-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
      <div class="mb-4">
        <label for="first-name">First Name*</label>
        <input type="text" name="first_name" id="first-name" required />
      </div>
      <div class="mb-4">
        <label for="last-name">Last Name*</label>
        <input type="text" name="last_name" id="last-name" required />
      </div>
      <div class="mb-4">
        <label for="preferred-name">Preferred Name</label>
        <input type="text" name="preferred_name" id="preferred-name" />
      </div>
      <div class="mb-4">
        <label for="pronouns">Pronouns</label>
        <input type="text" name="pronouns" id="pronouns" />
      </div>
      <div class="mb-4">
        <label for="twitter">Twitter*</label>
        <input
          type="text"
          name="twitter"
          id="twitter"
          placeholder="@username"
          maxlength="16"
          required />
      </div>
      <div class="mb-4">
        <label for="telegram">Telegram*</label>
        <input
          type="text"
          name="telegram"
          id="telegram"
          placeholder="@username"
          maxlength="33"
          required />
      </div>
      <div class="mb-4">
        <label for="phone">Phone Number*</label>
        <input
          type="text"
          name="phone"
          id="phone"
          bind:value={phoneNumber}
          oninput={formatPhoneNumber}
          placeholder="(000) 000-0000"
          required
          maxlength="14" />
      </div>
      <div class="mb-4">
        <label for="email">Email Address*</label>
        <input type="email" name="email" id="email" placeholder="your@mom.com" required />
      </div>
      <fieldset class="flex flex-col gap-1">
        <legend>How did you hear about us?</legend>
        <RadioButton name="how_referred" value="Bluesky" bind:group={selectedOption} required />
        <RadioButton name="how_referred" value="Twitter" bind:group={selectedOption} required />
        <RadioButton name="how_referred" value="Instagram" bind:group={selectedOption} required />
        <RadioButton name="how_referred" value="Other" bind:group={selectedOption} required />
        <input
          type="text"
          name="how_referred_other"
          id="other-text"
          placeholder="Please specify"
          required={selectedOption === "Other"}
          class={[
            "mt-2",
            selectedOption === "Other"
              ? "pointer-events-auto visible"
              : "pointer-events-none hidden"
          ]} />
      </fieldset>
    </div>

    <div class="mb-4">
      <input type="submit" value="Submit" />
    </div>
  </form>

  {#if form?.success}
    <p>submitted :3</p>
  {/if}
</section>

<style lang="postcss">
  @reference "../../../app.css";

  label {
    @apply mb-1 block text-sm;
  }

  input[type="text"],
  input[type="email"] {
    @apply ring-furworks w-full rounded-md border border-neutral-800 bg-neutral-900 p-3 text-sm transition-colors duration-75 ease-out outline-none focus:ring;
  }

  input[type="submit"] {
    @apply hover:bg-furworks ring-furworks cursor-pointer rounded-md bg-neutral-900 p-4 transition-colors ease-out outline-none hover:text-neutral-900 focus:ring;
  }
</style>
