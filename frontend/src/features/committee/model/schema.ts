import z from "zod"

const createCommitteeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  organizationId: z
    .string()
    .min(1, "Organization is required")
    .transform((value) => Number(value)),
})

export type TCreateCommittee = z.infer<typeof createCommitteeSchema>
export { createCommitteeSchema }
