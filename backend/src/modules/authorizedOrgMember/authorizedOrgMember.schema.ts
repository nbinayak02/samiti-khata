import z from "zod";

const authorizedOrgMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().optional(),
  phone: z.string().optional(),
});

export default authorizedOrgMemberSchema;
