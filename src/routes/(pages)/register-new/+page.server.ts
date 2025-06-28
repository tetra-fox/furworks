import { z } from "zod";
import type { Actions } from "./$types";

import RegistrationSchema from "$lib/components/forms/RegistrationSchema";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const parse = RegistrationSchema.safeParse(data);

    if (!parse.success) {
      console.error(parse.error.flatten());
      return {
        success: false,
        errors: parse.error.flatten().fieldErrors
      };
    }

    console.log("Valid submission:", parse.data);

    // TODO: db insert

    return { success: true };
  }
} satisfies Actions;
