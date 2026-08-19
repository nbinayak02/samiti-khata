import z from "zod";
import { Role } from "@/features/rbac/rbac.constants";

export const addAdminSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full Name must be at least 2 chars long." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  address: z
    .string()
    .trim()
    .min(2, { message: "Address must be at least 2 chars long." }),
  phoneNumber: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 chars long." })
    .max(10, { message: "Phone number must be at most 10 chars long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 chars long." }),
  role: z.nativeEnum(Role).default(Role.ADMIN),
});

export const addUserSchema = addAdminSchema;
