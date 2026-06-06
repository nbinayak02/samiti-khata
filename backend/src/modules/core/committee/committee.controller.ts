import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CommitteeService } from './committee.service';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { UserRole } from '@prisma/client';
import { CommitteeDto } from './lib/committee.dto';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import type { UserJwtPayload } from '@shared/auth';

@Controller('committee')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  async create(
    @Body() committeeDto: CommitteeDto,
    @GetUser() user: UserJwtPayload,
  ) {
    const { userId, organizationId } = user;
    if (!organizationId)
      throw new UnprocessableEntityException('Organization Id not found.');
    return await this.committeeService.create(
      committeeDto,
      userId,
      organizationId,
    );
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.committeeService.findById(id);
  }

  @Get('/organization/:organizationId')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getAll(@Param('organizationId', ParseIntPipe) organizationId: number) {
    return await this.committeeService.findAll(organizationId);
  }

  @Put(':committeeId')
  @Roles(UserRole.ADMIN)
  async updateCommittee(
    @Body() committeeDto: CommitteeDto,
    @Param('committeeId', ParseIntPipe) committeeId: number,
  ) {
    return await this.committeeService.update(committeeDto, committeeId);
  }

  @Patch('/active-status/:committeeId')
  @Roles(UserRole.ADMIN)
  async updateStatus(
    @Body('status', ParseBoolPipe) status: boolean,
    @Param('committeeId', ParseIntPipe) committeeId: number,
  ) {
    return await this.committeeService.updateStatus(status, committeeId);
  }

  @Delete(':committeeId')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('committeeId', ParseIntPipe) committeeId: number) {
    return await this.committeeService.softDelete(committeeId);
  }
}
