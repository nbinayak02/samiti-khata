import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { CategoryDto } from './lib/category.dto';
import { CategoryService } from './category.service';
import { RolesGuard } from '@shared/auth/guards/rbac.guard';
import { Roles } from '@shared/auth/decorators/rbac.decorator';
import { JwtAuthGuard } from '@shared/auth/guards/jwtauth.guard';
import { GetUser } from '@shared/auth/decorators/getUser.decorator';

@Controller('category')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.OPERATOR)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() categoryDto: CategoryDto,
    @GetUser('organizationId') organizationId: number,
  ) {
    return await this.categoryService.create(categoryDto, organizationId);
  }

  @Put(':categoryId')
  async update(
    @Body() categoryDto: CategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return await this.categoryService.update(categoryDto, categoryId);
  }

  @Patch(':categoryId')
  async softDelete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoryService.softDelete(categoryId);
  }

  @Get(':organizationId')
  async getByOrg(
    @Param('organizationId', ParseIntPipe) organizationId: number,
  ) {
    return await this.categoryService.getByOrg(organizationId);
  }
}
