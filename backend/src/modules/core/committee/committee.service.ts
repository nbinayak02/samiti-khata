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
        createdBy: userId,
        organizationId,
      },
    });
  }

  async update(committee: CommitteeDto, committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
        deletedAt: null,
      },
      data: {
        name: committee.name,
        description: committee.description,
      },
    });
  }

  async updateStatus(status: boolean, committeeId: number) {
    return await this.prisma.committee.update({
      where: {
        id: committeeId,
        deletedAt: null,
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
        deletedAt: null,
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
    });
  }

  async findById(committeeId: number) {
    return await this.prisma.committee.findUniqueOrThrow({
      where: { id: committeeId, deletedAt: null },
    });
  }

  async findAll(organizationId: number) {
    return await this.prisma.committee.findMany({
      where: { organizationId, deletedAt: null },
    });
  }
}
