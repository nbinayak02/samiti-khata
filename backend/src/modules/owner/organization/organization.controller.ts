import { UserRole } from '@prisma/client';
import { OrganizationDto } from './libs/organization.dto';
import { OrganizationService } from './organization.service';
import { GetUser, JwtAuthGuard, Roles, RolesGuard } from '@shared/auth';
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

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.OWNER)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @HttpCode(201)
  async create(
    @GetUser('userId') ownerId: number,
    @Body() organization: OrganizationDto,
  ) {
    const result = await this.organizationService.create(organization, ownerId);
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
