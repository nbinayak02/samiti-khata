import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CategoryDto } from './lib/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(categoryDto: CategoryDto, organizationId: number) {
    return await this.prisma.category.create({
      data: {
        name: categoryDto.name,
        description: categoryDto.description,
        organizationId,
      },
    });
  }

  async getByOrg(organizationId: number) {
    return await this.prisma.category.findMany({
      where: {
        organizationId,
        deletedAt: null,
      },
    });
  }

  async update(categoryDto: CategoryDto, categoryID: number) {
    return await this.prisma.category.update({
      where: { id: categoryID },
      data: categoryDto,
    });
  }

  async softDelete(categoryId: number) {
    return await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
  }
}
