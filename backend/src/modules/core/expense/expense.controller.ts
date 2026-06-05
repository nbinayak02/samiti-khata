import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { type UserJwtPayload } from '@shared/auth';
import { ExpenseService } from './expense.service';
import { ExpenseDto, UpdateExpenseDto } from './lib/expense.dto';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { RequireAdminOrOperator } from '@shared/auth/decorators/adminOrOperator.decorator';
import { GetQueryDto } from '../../../common/queryString.dto';

@Controller('expense')
@RequireAdminOrOperator()
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(
    @Body() expenseDto: ExpenseDto,
    @GetUser('userId') userId: number,
  ) {
    return await this.expenseService.create(expenseDto, userId);
  }

  @Get()
  async getExpenses(
    @GetUser('organizationId') organizationId: number,
    @Query() query: GetQueryDto,
  ) {
    return await this.expenseService.getExpenses(
      organizationId,
      query.pageSize,
      query.pageNumber,
      query.sortDir,
    );
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.expenseService.getById(id, organizationId);
  }

  @Put(':id')
  async update(
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserJwtPayload,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.expenseService.update(id, updateExpenseDto, {
      description: updateExpenseDto.description,
      organizationId: user.organizationId,
      userId: user.userId,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') description: string,
    @GetUser() user: UserJwtPayload,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.expenseService.softDelete(id, {
      description,
      organizationId: user.organizationId,
      userId: user.userId,
    });
  }
}
