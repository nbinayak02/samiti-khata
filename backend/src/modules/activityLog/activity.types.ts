import { ActivityLog } from "../../../generated/prisma/client";

export type TCreateActivityLog = Omit<ActivityLog, "id" | "createdAt">

export type TLogInfo = {
  description: string,
  organizationId: number,
  userId: number,
}