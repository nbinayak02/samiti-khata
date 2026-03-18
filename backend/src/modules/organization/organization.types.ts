import z from "zod";
import organizationSchema from "./organization.schema";

export type TCreateOrganization = z.infer<typeof organizationSchema>;