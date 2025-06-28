import { z } from "zod";

const validSocialPlatforms = ["bluesky", "twitter", "instagram"] as const;
const validRefers = ["bluesky", "twitter", "instagram", "word_of_snout", "other"] as const;

const registrationSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    preferred_name: z.string().optional(),
    pronouns: z.string().optional(),
    social_platform: z
      .string()
      .transform((val) => val.toLowerCase())
      .pipe(
        z.enum(validSocialPlatforms, {
          errorMap: () => ({ message: "Please select a valid social platform" })
        })
      ),
    social_handle: z.string().min(1, "Social handle is required"),
    telegram: z.string().min(1, "Telegram handle is required"),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email format"),
    how_referred: z
      .string()
      .transform((val) => val.toLowerCase())
      .pipe(
        z.enum(validRefers, {
          errorMap: () => ({ message: "Please select a valid referral source" })
        })
      ),
    how_referred_other: z.string().optional(),
    agree_age: z.literal("on"),
    agree_coc: z.literal("on"),
    agree_liability: z.literal("on")
  })
  .superRefine((data, ctx) => {
    if (data.how_referred === "other" && !data.how_referred_other?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify how you were referred.",
        path: ["how_referred_other"]
      });
    }
  });

export default registrationSchema;
