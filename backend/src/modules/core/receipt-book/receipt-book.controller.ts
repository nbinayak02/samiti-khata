import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AssignBookDto } from './lib/assign-book.dto';
import { ReturnBookDto } from './lib/return-book.dto';
import { ReceiptBookDto } from './lib/receipt-book.dto';
import { ReceiptBookService } from './receipt-book.service';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { RequireAdminOrOperator } from '@shared/auth/decorators/adminOrOperator.decorator';
import { GetQueryDto } from '../../../common/queryString.dto';
import { CursorPaginationDto } from '../../../common/cursorPagination.dto';
import { ReceiptBookQueryDto } from './lib/receipt-book.query.dto';
import buildReceiptWhereClause from './lib/buildReceiptWhereClause';

@Controller('receipt-book')
@RequireAdminOrOperator()
export class ReceiptBookController {
  constructor(private readonly receiptBookService: ReceiptBookService) {}

  @Post()
  async create(
    @Body() receiptBookDto: ReceiptBookDto,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.receiptBookService.create(receiptBookDto, organizationId);
  }

  @Get()
  async getAll(
    @GetUser('organizationId') organizationId: number,
    @Query() queryParams: ReceiptBookQueryDto,
  ) {
    const whereClause = buildReceiptWhereClause(organizationId, queryParams);

    return await this.receiptBookService.getAll(whereClause, queryParams);
  }

  @Get('/cursor')
  async getAllViaCursorPaginated(
    @GetUser('organizationId') organizationId: number,
    @Query() queryParams: CursorPaginationDto,
  ) {
    return await this.receiptBookService.getAllViaCursorPaginated(
      organizationId,
      queryParams,
    );
  }

  @Patch('assign-book/:bookId')
  async assignBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() assignBookDto: AssignBookDto,
  ) {
    const { assignedAt, assignedTo } = assignBookDto;
    return await this.receiptBookService.assignBook(
      bookId,
      assignedTo,
      assignedAt,
    );
  }

  @Patch('return-book/:bookId')
  async returnBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() returnBookDto: ReturnBookDto,
  ) {
    return await this.receiptBookService.returnBook(
      bookId,
      returnBookDto.returnedAt,
    );
  }

  @Get(':bookId')
  async getById(
    @Param('bookId', ParseIntPipe) bookId: number,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.receiptBookService.getById(bookId, organizationId);
  }
}
