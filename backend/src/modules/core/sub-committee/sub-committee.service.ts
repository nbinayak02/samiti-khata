import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { SubCommitteeDto } from './lib/subCommittee.dto';

@Injectable()
export class SubCommitteeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(subCommittee: SubCommitteeDto) {
    return this.prisma.subCommittee.create({
      data: {
        name: subCommittee.name,
        description: subCommittee.description,
        mainCommitteeId: subCommittee.mainCommitteeId,
      },
    });
  }

  async getAll(committeeId: number) {
    return this.prisma.subCommittee.findMany({
      where: {
        mainCommitteeId: committeeId,
      },
    });
  }
}
