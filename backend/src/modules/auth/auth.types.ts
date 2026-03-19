import z from "zod";
import { logInSchema, signUpSchema } from "./auth.schema";
import { UserRole } from "../../../generated/prisma/enums";

export type UserSignUp = z.infer<typeof signUpSchema>;
export type UserLogIn = z.infer<typeof logInSchema>;

export type UserToken = {
  id: number;
  role: UserRole;
  organizationId?: number | undefined;
};
