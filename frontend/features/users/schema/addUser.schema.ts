import z from "zod";

export const addUserSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 chars long." }),
  email: z.string().email(),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 chars long." }),
  phoneNumber: z
    .string()
    .length(10, { message: "Phone number must be 10 chars long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 chars long." }),
});
