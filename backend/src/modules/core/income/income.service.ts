import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { IncomeDto, UpdateIncomeDto } from './lib/income.dto';
import { LogInfo, SortDirection } from '../../../common/types';
import { Income, Prisma } from '@prisma/client';
import findDiffsForUpdate from '../../../common/findDiffsForUpdate';
import { Decimal } from '@prisma/client/runtime/client';

@Injectable()
export class IncomeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(incomeDto: IncomeDto, userId: number) {
    return await this.prisma.income.create({
      data: {
        address: incomeDto.address,
        amount: incomeDto.amount,
        billNumber: incomeDto.billNumber,
        bookNumber: incomeDto.bookNumber,
        date: incomeDto.date,
        name: incomeDto.name,
        nepaliDate: incomeDto.nepaliDate,
        billIssuerId: incomeDto.billIssuerId,
        committeeId: incomeDto.committeeId,
        createdBy: userId,
        billImageUrl: incomeDto.billImageUrl,
        remarks: incomeDto.remarks,
        subCommitteeId: incomeDto.subCommitteeId,
      },
    });
  }

  async getIncomes(
    organizationId: number,
    pageSize: number = 10,
    pageNumber: number = 1,
    sortDir: SortDirection = 'desc',
  ) {
    return this.prisma.income.findMany({
      where: {
        deletedAt: null,
        Committee: {
          organizationId,
        },
      },
      include: {
        AuthorizedOrgMember: true,
        Committee: true,
        SubCommittee: true,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      orderBy: {
        id: sortDir,
      },
    });
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
        const existingData = await tx.income.findFirst({
          where: {
            id,
          },
        });

        if (!existingData)
          throw new NotFoundException(
            'The data that you are trying to update is not found.',
          );

        const updatePayload: Income = {
          ...incomeDto,
          id: existingData.id,
          amount: Decimal(incomeDto.amount),
          createdAt: existingData.createdAt,
          updatedAt: existingData.updatedAt,
          createdBy: existingData.createdBy,
          deletedAt: existingData.deletedAt,
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
        return updated;
      },
    );
  }
}
