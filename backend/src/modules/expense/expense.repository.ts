import { NotFoundError } from "../../errors/customError";
import { prisma } from "../../lib/prisma";
import findDiffsForUpdate from "../../utlis/findDiffsForUpdate";
import ActivityLogRepository from "../activityLog/activity.repository";
import { TCreateActivityLog, TLogInfo } from "../activityLog/activity.types";
import {
  ExpensePaymentMode,
  TExpenseFormData,
  TExpenseSearchWhereClause,
} from "./expense.types";
import { Prisma } from "../../../generated/prisma/client";

type TransactionClient = Prisma.TransactionClient;
const ExpenseRepository = {
  create: async (data: TExpenseFormData, userId: number) => {
    return await prisma.expense.create({
      data: {
        ...data,
        remarks: data.remarks || null,
        createdBy: userId,
      },
    });
  },

  update: async (
    resourceId: number,
    updatePayload: TExpenseFormData,
    logInfo: TLogInfo,
  ) => {
    return await prisma.$transaction(async (tx: TransactionClient) => {
      // 1. fetch current row
      const existingData = await tx.expense.findFirst({
        where: {
          id: resourceId,
        },
      });

      // console.log({ existingData });

      if (!existingData)
        throw new NotFoundError(
          "The data that you are trying to update is not found.",
        );

      const oldData: TExpenseFormData = {
        ...existingData,
        paymentMode: existingData.paymentMode as ExpensePaymentMode,
        quantity: existingData.quantity || undefined,
        voucherNumber: existingData.voucherNumber || undefined,
        billNumber: existingData.billNumber || undefined,
        amount: String(existingData.amount),
        date: new Date(existingData.date).toISOString(),
        remarks: existingData.remarks || undefined,
        subCommitteeId: existingData.subCommitteeId || undefined,
        payerId: existingData.payerId || undefined,
        
      };

      // console.log({ oldData });

      // 2. find the differences
      const { previous, current } = findDiffsForUpdate<TExpenseFormData>(
        oldData,
        updatePayload,
      );

      // 3. update data
      const updatedData = await tx.expense.update({
        where: {
          id: resourceId,
        },
        data: {
          ...updatePayload,
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
        entityType: "EXPENSE",
        organizationId: logInfo.organizationId,
        previousData: JSON.stringify(previous),
        userId: logInfo.userId,
      };

      await ActivityLogRepository.add(payload, tx);

      return updatedData;
    });
  },

  getRecentExpensesByOrganizationPaginated: async (
    organizationId: number,
    pageSize: number,
    pageNumber: number,
  ) => {
    return await prisma.expense.findMany({
      where: {
        deletedAt: null,
        committee: {
          organizationId,
        },
      },
      include: {
        category: true,
        committee: true,
        paidBy: true,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: "desc",
      },
    });
  },

  search: async (
    where: TExpenseSearchWhereClause,
    skip: number,
    takePage: number | undefined,
  ) => {
    return prisma.expense.findMany({
      skip,
      take: takePage,
      where: {
        ...where,
        deletedAt: null,
      },
      include: {
        category: true,
        committee: true,
      },
    });
  },

  count: async (where: TExpenseSearchWhereClause) => {
    return prisma.expense.count({
      where: {
        ...where,
        deletedAt: null,
      },
    });
  },

 getById: async (id: number, organizationId: number) => {
    return await prisma.expense.findFirst({
      where: {
        id,
        committee: {
          organizationId,
        },
      },
      include: {
        category: true,
        createdByUser: {
          select: {
            id: true,
            fullName: true,
            address: true,
            email: true,
          },
        },
        paidBy: true,
        committee: true,
      },
    });
  },

  softDelete: async (id: number, logInfo: TLogInfo) => {
    return await prisma.$transaction(async (tx: TransactionClient) => {
      const updated = await tx.expense.update({
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
        entityType: "EXPENSE",
        organizationId: logInfo.organizationId,
        previousData: null,
        userId: logInfo.userId,
      };

      await ActivityLogRepository.add(payload, tx);
      return updated;
    });
  },
};

export default ExpenseRepository;
