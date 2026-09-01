import { Prisma } from '@prisma/client';
import { IncomeQueryDto } from './lib/income.query.dto';

export default function buildIncomeWhereClause(
  organizationId: number,
  query: IncomeQueryDto,
): Prisma.IncomeWhereInput {
  const searchColumn = query.searchColumn.trim();
  const searchKey = query.searchKey.trim();

  const whereClause: Prisma.IncomeWhereInput = {
    deletedAt: null,
    Committee: {
      organizationId,
    },
  };

  if (query.receiptBookId) {
    whereClause.receiptBookId = Number(query.receiptBookId);
  }

  if (query.committeeId) {
    whereClause.committeeId = Number(query.committeeId);
  }

  if (!searchColumn || !searchKey) {
    return whereClause;
  }

  if (searchColumn === 'name') {
    whereClause.name = {
      contains: searchKey,
      mode: 'insensitive',
    };
  }

  if (searchColumn === 'address') {
    whereClause.address = {
      contains: searchKey,
      mode: 'insensitive',
    };
  }

  if (searchColumn === 'receiptNumber') {
    whereClause.receiptNumber = Number(searchKey);
  }

  if (searchColumn === 'receiptBookId') {
    whereClause.receiptBookId = Number(searchKey);
  }

  return whereClause;
}
