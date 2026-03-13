import { Request } from "express";
import { UserToken } from "../modules/user/user.type";

export interface CustomRequest extends Request {
  user?: UserToken;
}
