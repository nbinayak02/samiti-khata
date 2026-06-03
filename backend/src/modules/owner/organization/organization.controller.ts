import { UserRole } from '@prisma/client';
import { OrganizationDto } from './libs/organization.dto';
import { OrganizationService } from './organization.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import type { UserJwtPayload } from '@shared/auth';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.OWNER)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @HttpCode(201)
  async create(
    @GetUser() user: UserJwtPayload,
    @Body() organization: OrganizationDto,
  ) {
    const result = await this.organizationService.create(
      organization,
      user.userId,
    );
    return result;
  }

  @Get()
  async getAll(@GetUser('userId') ownerId: number) {
    const result = await this.organizationService.getAll(ownerId);
    return result;
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) orgId: number) {
    return await this.organizationService.getById(orgId);
  }
}
