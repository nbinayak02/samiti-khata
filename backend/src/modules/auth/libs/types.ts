import { Request } from 'express';

export type UserJwtPayload = {
  userId: number;
  role: string;
  organizationRelnId: number | undefined;
  refreshToken?: string;
};

export interface AuthenticatedRequest extends Request {
  user?: UserJwtPayload;
}
