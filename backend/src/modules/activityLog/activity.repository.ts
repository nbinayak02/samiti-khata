import { TCreateActivityLog } from "./activity.types";
import { Prisma } from "../../../generated/prisma/client";

type TransactionClient = Prisma.TransactionClient;

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
