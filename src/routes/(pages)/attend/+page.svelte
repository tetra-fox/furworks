<script lang="ts">
  let selectedOption = "";
</script>

<section class="flex h-full w-full items-center justify-center">
  <div>
    <h1 class="mb-4 text-4xl">Register</h1>
    <h2 class="text-l mb-4 italic">
      By continuing, you confirm that you are at least 21 years of age.
    </h2>
    <form action="" method="POST">
      <div class="grid lg:grid-cols-2 gap-x-8 gap-y-4">
        <fieldset>
          <label for="first-name">First Name</label>
          <input type="text" name="first-name" id="first-name" required />
        </fieldset>
        <fieldset>
          <label for="last-name">Last Name</label>
          <input type="text" name="last-name" id="last-name" required />
        </fieldset>
        <fieldset>
          <label for="preferred-name">Preferred Name</label>
          <input type="text" name="preferred-name" id="preferred-name" />
        </fieldset>
        <fieldset>
          <label for="pronouns">Pronouns</label>
          <input type="text" name="pronouns" id="pronouns" />
        </fieldset>
        <fieldset>
          <label for="twitter">Twitter (@username)</label>
          <input type="text" name="twitter" id="twitter" placeholder="@username" required />
        </fieldset>
        <fieldset>
          <label for="telegram">Telegram (@username)</label>
          <input type="text" name="telegram" id="telegram" placeholder="@username" required />
        </fieldset>
        <fieldset>
          <label for="phone">Phone Number</label>
          <input type="tel" name="phone" id="phone" pattern="[0-9]{10}" required />
        </fieldset>
        <fieldset>
          <label for="email">Email Address</label>
          <input type="email" name="email" id="email" required />
        </fieldset>
        <fieldset>
          <legend>How did you hear about us?</legend>
          <label>
            <input
              type="radio"
              name="how-referred"
              value="Bluesky"
              bind:group={selectedOption}
              required /> Bluesky
          </label>
          <label>
            <input
              type="radio"
              name="how-referred"
              value="Twitter"
              bind:group={selectedOption}
              required /> Twitter
          </label>
          <label>
            <input
              type="radio"
              name="how-referred"
              value="Instagram"
              bind:group={selectedOption}
              required /> Instagram
          </label>
          <label>
            <input
              type="radio"
              name="how-referred"
              value="Other"
              bind:group={selectedOption}
              required /> Other
          </label>
          {#if selectedOption === "Other"}
            <input
              type="text"
              name="other-how-referred"
              id="other-text"
              placeholder="Please specify"
              required />
          {/if}
        </fieldset>
      </div>
      <fieldset>
        <input type="submit" value="Submit" />
      </fieldset>
    </form>
  </div>
</section>

<style lang="postcss">
  @reference "../../../app.css";

  label {
    @apply mb-1 text-sm;
  }

  input[type="text"],
  input[type="tel"],
  input[type="email"] {
    @apply focus:border-furworks rounded-md border border-neutral-800 bg-neutral-900 p-4 transition-colors duration-75 ease-out outline-none;
  }

  input[type="submit"] {
    @apply hover:bg-furworks cursor-pointer rounded-md bg-neutral-900 p-6 transition-colors ease-out hover:text-neutral-900;
  }

  fieldset {
    @apply flex flex-col;
  }
</style>
