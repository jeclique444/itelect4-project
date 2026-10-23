import { z } from "zod";

// Same 20-to-2000 rule and messages as the backend, 
// so the browser says it before a request is spent.
export const reviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Describe your session plan in at least 20 characters.")
    .max(2000, "Keep the description under 2000 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;