import { prisma } from "../../lib/prisma";
import { NotFoundError } from "../../errors/customError";
import findDiffsForUpdate from "../../utlis/findDiffsForUpdate";
import ActivityLogRepository from "../activityLog/activity.repository";
import { TIncomeFormData, TSearchIncomeWhereClause } from "./income.types";
import { TCreateActivityLog, TLogInfo } from "../activityLog/activity.types";
import { TransactionClient } from "../../../generated/prisma/internal/prismaNamespace";

const IncomeRepository = {
  create: async (data: TIncomeFormData, createdBy: number) => {
    return await prisma.income.create({
      data: {
        ...data,
        createdBy,
        remarks: data.remarks || null,
      },
    });
  },

  getRecentIncomesByOrganizationPaginated: async (
    organizationId: number,
    pageSize: number,
    pageNumber: number,
  ) => {
    return await prisma.income.findMany({
      where: {
        deletedAt: null,
        committee: {
          organizationId,
        },
      },
      include: {
        billIssuer: true,
        committee: true,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });
  },

  search: async (
    where: TSearchIncomeWhereClause,
    skip: number,
    takePage: number | undefined,
  ) => {
    return prisma.income.findMany({
      skip,
      take: takePage,
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        committee: { select: { id: true, name: true } },
        billIssuer: {
          select: { id: true, name: true },
        },
      },
    });
  },

  count: async (where: TSearchIncomeWhereClause) => {
    return prisma.income.count({
      where: {
        ...where,
        deletedAt: null,
      },
    });
  },

  getById: async (id: number, organizationId: number) => {
    return await prisma.income.findFirst({
      where: {
        id,
        committee: {
          organizationId,
        },
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            fullName: true,
            address: true,
            email: true,
          },
        },
        billIssuer: true,
        committee: true,
      },
    });
  },

  update: async (
    resourceId: number,
    updatePayload: TIncomeFormData,
    logInfo: TLogInfo,
  ) => {
    return await prisma.$transaction(async (tx: TransactionClient) => {
      // 1. fetch current row
      const existingData = await tx.income.findFirst({
        where: {
          id: resourceId,
        },
      });

      // console.log({ existingData });

      if (!existingData)
        throw new NotFoundError(
          "The data that you are trying to update is not found.",
        );

      const oldData: TIncomeFormData = {
        ...existingData,
        amount: String(existingData.amount),
        date: new Date(existingData.date).toISOString(),
        remarks: existingData.remarks || undefined,
      };

      // console.log({ oldData });

      // 2. find the differences
      const { previous, current } = findDiffsForUpdate<TIncomeFormData>(
        oldData,
        updatePayload,
      );

      // 3. update data
      const updatedData = await tx.income.update({
        where: {
          id: resourceId,
        },
        data: {
          ...updatePayload,
          amount: Number(updatePayload.amount),
          remarks: updatePayload.remarks || null,
        },
      });

      // 4. create log
      const payload: TCreateActivityLog = {
        action: "UPDATE",
        committeeId: updatedData.committeeId,
        currentData: JSON.stringify(current),
        description: logInfo.description,
        entityId: updatedData.id,
        entityType: "INCOME",
        organizationId: logInfo.organizationId,
        previousData: JSON.stringify(previous),
        userId: logInfo.userId,
      };

      await ActivityLogRepository.add(payload, tx);

      return updatedData;
    });
  },

  softDelete: async (id: number, logInfo: TLogInfo) => {
    return await prisma.$transaction(async (tx: TransactionClient) => {
      const updated = await tx.income.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date().toISOString(),
        },
      });

      const payload: TCreateActivityLog = {
        action: "DELETE",
        committeeId: updated.committeeId,
        currentData: null,
        description: logInfo.description,
        entityId: updated.id,
        entityType: "INCOME",
        organizationId: logInfo.organizationId,
        previousData: null,
        userId: logInfo.userId,
      };

      await ActivityLogRepository.add(payload, tx);
      return updated;
    });
  },
};

export default IncomeRepository;
