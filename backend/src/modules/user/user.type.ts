import z from "zod";
import approveAdminSchema from "./user.schema";

export type TApproveAdminPayload = z.infer<typeof approveAdminSchema>;
