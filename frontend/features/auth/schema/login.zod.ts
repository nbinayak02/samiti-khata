import { z } from "zod/v3";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 chars long." }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export default loginSchema;
