import { ActivityLog } from "../../../generated/prisma/client";
import { TransactionClient } from "../../../generated/prisma/internal/prismaNamespace";
import { TCreateActivityLog } from "./activity.types";

const ActivityLogRepository = {
  add: async (data: TCreateActivityLog, tx: TransactionClient) => {
    await tx.activityLog.create({
      data: {
        ...data,
        previousData: data.previousData ?? "{}",
        currentData: data.currentData ?? "{}",
      },
    });
  },
};

export default ActivityLogRepository;
