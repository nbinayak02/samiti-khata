import z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Phone number must be at most 10 characters long"),
});

export const logInSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

