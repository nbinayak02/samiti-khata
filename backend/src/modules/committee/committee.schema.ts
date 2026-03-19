import z from "zod";

const committeeSchema = z.object({
  name: z.string().min(1, "Committee name is required"),
  description: z.string().min(1, "Committee description is required"),
  isActive: z.boolean().default(true),
});

export default committeeSchema;
