import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { CommitteeDto } from './lib/committee.dto';

@Injectable()
export class CommitteeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    committee: CommitteeDto,
    userId: number,
    organizationId: number,
  ) {
    return await this.prisma.committee.create({
      data: {
        name: committee.name,
        description: committee.description,
        isActive: committee.isActive,
        createdBy: userId,
        organizationId,
      },
    });
  }

  async update(committee: CommitteeDto, committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
      },
      data: {
        name: committee.name,
        description: committee.description,
        isActive: committee.isActive,
      },
    });
  }

  async updateStatus(status: boolean, committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
      },
      data: {
        isActive: status,
      },
    });
  }

  async softDelete(committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
  }

  async findById(committeeId: number) {
    return await this.prisma.committee.findUnique({
      where: { id: committeeId },
    });
  }

  async findAll(organizationId: number) {
    return await this.prisma.committee.findMany({
      where: { organizationId, deletedAt: null },
    });
  }
}
