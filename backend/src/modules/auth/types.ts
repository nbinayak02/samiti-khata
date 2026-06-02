export type UserJwtPayload = {
  userId: number;
  role: string;
  organizationRelnId: number | undefined;
  refreshToken?: string;
};
