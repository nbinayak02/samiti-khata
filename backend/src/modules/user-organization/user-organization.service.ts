import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserOrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async getByUserId(userId: number) {
    return await this.prisma.userOrganization.findUnique({
      where: { userId },
    });
  }
}
