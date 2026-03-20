import z from "zod"

const billIssuerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  phone: z.string().optional(),
})

export type TCreateBillIssuer = z.infer<typeof billIssuerSchema>
export default billIssuerSchema
