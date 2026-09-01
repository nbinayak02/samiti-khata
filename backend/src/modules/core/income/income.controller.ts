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
import { IncomeService } from './income.service';
import { type UserJwtPayload } from '@shared/auth';
import buildIncomeWhereClause from './lib/buildIncomeWhereClause';
import { IncomeDto, UpdateIncomeDto } from './lib/income.dto';
import { GetQueryDto } from '../../../common/queryString.dto';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { RequireAdminOrOperator } from '@shared/auth/decorators/adminOrOperator.decorator';
import { IncomeQueryDto } from './lib/income.query.dto';

@Controller('income')
@RequireAdminOrOperator()
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post()
  async create(
    @Body() incomeDto: IncomeDto,
    @GetUser('userId') userId: number,
  ) {
    return await this.incomeService.create(incomeDto, userId);
  }

  @Get()
  async getIncomes(
    @GetUser('organizationId') organizationId: number,
    @Query() query: IncomeQueryDto,
  ) {
    const whereClause = buildIncomeWhereClause(organizationId, query);
    return await this.incomeService.getFilteredIncomes(whereClause, query);
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.incomeService.getById(id, organizationId);
  }

  @Put(':id')
  async update(
    @Body() updateIncomeDto: UpdateIncomeDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserJwtPayload,
  ) {
    if (!user.organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.incomeService.update(id, updateIncomeDto, {
      description: updateIncomeDto.description,
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
    return await this.incomeService.softDelete(id, {
      description,
      organizationId: user.organizationId,
      userId: user.userId,
    });
  }
}
