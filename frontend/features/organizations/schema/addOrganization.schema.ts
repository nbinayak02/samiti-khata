import z from "zod";

export const addOrganizationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 chars long." }),
  email: z.string().email(),
  address: z
    .string()
    .min(2, { message: "Address must be at least 2 chars long" }),
  phoneNumber: z
    .string()
    .length(10, { message: "Phone number must be 10 chars long" }),
});
