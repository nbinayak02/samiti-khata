import z from "zod"

const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  address: z.string().min(1, "Organization address is required"),
  email: z
    .email("Invalid email address")
    .min(1, "Organization email is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be of 10 digits")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
})

export type TCreateOrganization = z.infer<typeof createOrganizationSchema>

export default createOrganizationSchema
