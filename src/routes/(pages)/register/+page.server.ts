import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    console.log(data);

    // TODO input validaiton & submission

    return { success: true };
  }
} satisfies Actions;
