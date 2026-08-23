import { PrismaService } from '@shared/prisma';
import { Income, Prisma } from '@prisma/client';
import { SortDirection } from '../../../common/types';
import { Decimal } from '@prisma/client/runtime/client';
import { ActivityLogService } from '@shared/activity-log';
import { Injectable } from '@nestjs/common';
import { IncomeDto, UpdateIncomeDto } from './lib/income.dto';
import findDiffsForUpdate from '../../../common/findDiffsForUpdate';
import { LogInfo, TActivityLog } from '@shared/activity-log/lib/types';
import { GetQueryDto } from '../../../common/queryString.dto';

@Injectable()
export class IncomeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activityLog: ActivityLogService,
  ) {}

  async create(incomeDto: IncomeDto, userId: number) {
    return await this.prisma.income.create({
      data: {
        receiptNumber: incomeDto.receiptNumber,
        receiptBookId: incomeDto.receiptBookId,
        name: incomeDto.name,
        address: incomeDto.address,
        amount: incomeDto.amount,
        paymentMode: incomeDto.paymentMode,
        remarks: incomeDto.remarks,
        committeeId: incomeDto.committeeId,
        receiptIssuerId: incomeDto.receiptIssuerId,
        createdBy: userId,
        date: incomeDto.date,
        nepaliDate: incomeDto.nepaliDate,
        subCommitteeId: incomeDto.subCommitteeId,
      },
    });
  }

  async getIncomes(organizationId: number, queryDto: GetQueryDto) {
    const [data, totalRows] = await Promise.all([
      this.prisma.income.findMany({
        where: {
          deletedAt: null,
          Committee: {
            organizationId,
          },
        },
        include: {

          receiptBook: {
            select: {
              id: true,
              bookNumber: true,
            },
          },
          Committee: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        skip: (queryDto.pageIndex - 1) * queryDto.pageSize,
        take: queryDto.pageSize,
        orderBy: {
          id: queryDto.sortDir,
        },
      }),

      // get rows count
      this.prisma.receiptBooks.count({
        where: {
          organizationId,
        },
      }),
    ]);

    return {
      results: data,
      meta: {
        pageIndex: queryDto.pageIndex,
        pageSize: queryDto.pageSize,
        totalPages: Math.ceil(totalRows / queryDto.pageSize),
      },
    };
  }

  async getById(id: number, organizationId: number) {
    return await this.prisma.income.findFirst({
      where: {
        id,
        Committee: {
          organizationId,
        },
      },
      include: {
        AuthorizedOrgMember: true,
        User: {
          select: {
            id: true,
            fullName: true,
            address: true,
            email: true,
          },
        },
        SubCommittee: true,
        Committee: true,
      },
    });
  }

  async update(id: number, incomeDto: UpdateIncomeDto, logInfo: LogInfo) {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        // 1. fetch current row
        const existingData = await tx.income.findFirstOrThrow({
          where: {
            id,
          },
        });

        const updatePayload: Income = {
          ...incomeDto,
          id: existingData.id,
          amount: Decimal(incomeDto.amount),
          createdAt: existingData.createdAt,
          updatedAt: existingData.updatedAt,
          createdBy: existingData.createdBy,
          deletedAt: existingData.deletedAt,
          receiptImageUrl: '',
          remarks: incomeDto.remarks ?? null,
          date: incomeDto.date as unknown as Date,
          receiptIssuerId: incomeDto.receiptIssuerId ?? null,
          subCommitteeId: incomeDto.subCommitteeId ?? null,
        };

        const { current, previous } = findDiffsForUpdate<Income>(
          existingData,
          updatePayload,
        );

        const updatedData = await tx.income.update({
          where: {
            id,
          },
          data: {
            ...updatePayload,
            remarks: updatePayload.remarks || null,
          },
        });

        // create log
        const payload: TActivityLog = {
          action: 'UPDATE',
          committeeId: updatedData.committeeId,
          currentData: JSON.stringify(current),
          description: logInfo.description,
          entityType: 'INCOME',
          organizationId: logInfo.organizationId,
          previousData: JSON.stringify(previous),
          userId: logInfo.userId,
        };

        await this.activityLog.create(payload, tx);
        return updatedData;
      },
    );
  }

  async softDelete(id: number, logInfo: LogInfo) {
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const updated = await tx.income.update({
          where: {
            id,
          },
          data: {
            deletedAt: new Date().toISOString(),
          },
        });

        // activity log here
        const payload: TActivityLog = {
          action: 'DELETE',
          committeeId: updated.committeeId,
          currentData: null,
          description: logInfo.description,
          entityType: 'INCOME',
          organizationId: logInfo.organizationId,
          previousData: null,
          userId: logInfo.userId,
        };

        await this.activityLog.create(payload, tx);
        return updated;
      },
    );
  }
}
