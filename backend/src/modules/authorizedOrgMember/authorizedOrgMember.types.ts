import z from "zod";
import authorizedOrgMemberSchema from "./authorizedOrgMember.schema";

export type TCreateAuthorizedOrgMember = z.infer<
  typeof authorizedOrgMemberSchema
>;
