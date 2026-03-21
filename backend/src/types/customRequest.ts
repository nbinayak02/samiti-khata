import { Request } from "express";
import { UserToken } from "../modules/auth/auth.types";

export interface CustomRequest extends Request {
  user?: UserToken;
}
