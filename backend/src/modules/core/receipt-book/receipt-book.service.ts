import { Injectable } from '@nestjs/common';
import { BookStatus } from '@prisma/client';
import { PrismaService } from '@shared/prisma';
import { ReceiptBookDto } from './lib/receipt-book.dto';

@Injectable()
export class ReceiptBookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(receiptBookDto: ReceiptBookDto, organizationId: number) {
    let status: BookStatus = 'AVAILABLE';

    if (receiptBookDto.assignedTo && !receiptBookDto.returnedAt)
      status = 'ASSIGNED';
    if (receiptBookDto.assignedTo && receiptBookDto.returnedAt)
      status = 'RETURNED';

    return await this.prisma.receiptBooks.create({
      data: {
        bookNumber: receiptBookDto.bookNumber,
        receiptStartingNumber: receiptBookDto.receiptStartingNumber,
        receiptEndingNumber: receiptBookDto.receiptEndingNumber,
        fiscalYearId: receiptBookDto.fiscalYearId,
        assignedTo: receiptBookDto.assignedTo,
        assignedAt: receiptBookDto.assignedAt,
        status,
        returnedAt: receiptBookDto.returnedAt,
        organizationId,
      },
    });
  }

  async getAll(organizationId: number) {
    return await this.prisma.receiptBooks.findMany({
      where: {
        organizationId,
      },
    });
  }

  async getById(id: number, organizationId: number) {
    return await this.prisma.receiptBooks.findFirstOrThrow({
      where: {
        id,
        organizationId,
      },
    });
  }

  async assignBook(bookId: number, assignedTo: number, assignedAt: Date) {
    return await this.prisma.receiptBooks.update({
      where: {
        id: bookId,
      },
      data: {
        assignedTo,
        assignedAt,
        status: 'ASSIGNED',
      },
    });
  }

  async returnBook(bookId: number, returnedAt: Date) {
    return await this.prisma.receiptBooks.update({
      where: {
        id: bookId,
      },
      data: {
        returnedAt,
        status: 'RETURNED',
      },
    });
  }
}
