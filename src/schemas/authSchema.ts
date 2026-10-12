// src/schemas/authSchema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("That is not an email address."),

  // Eight, because itelect4-backend's User schema says minlength: 8.
  // This one is a courtesy to whoever is typing -- the rule that is
  // true lives in the User schema on the server.
  password: z.string().min(8, "At least 8 characters."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// .extend() adds to a schema instead of writing it twice. The register
// route wants the same email and password plus a name.
export const registerSchema = loginSchema.extend({
  name: z.string().min(1, "Your name is required."),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;        