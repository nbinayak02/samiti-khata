import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address."),
  password: z
    .string("Password is required.")
    .trim()
    .min(8, "Password must be at least 8 chars long."),
});

export type LoginSchema = z.infer<typeof loginSchema>;
