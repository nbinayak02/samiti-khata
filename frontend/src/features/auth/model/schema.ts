import z from "zod"

export const signUpSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    address: z.string().min(1, "Address is required"),
    role: z.enum(["ADMIN", "OPERATOR"]).default("OPERATOR"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .max(10, "Phone number must be at most 10 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password do not match",
    path: ["confirmPassword"],
  })

export const logInSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type TSignupFormData = z.infer<typeof signUpSchema>
export type TLoginFormData = z.infer<typeof logInSchema>
