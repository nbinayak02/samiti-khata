import z from "zod";

const approveAdminSchema = z.object({
  userId: z.number(),
  organizationId: z.number(),
});

export default approveAdminSchema;
