import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { SubCommitteeDto } from './lib/subCommittee.dto';
import { CommitteeService } from '@core/committee';

@Injectable()
export class SubCommitteeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly committee: CommitteeService,
  ) {}

  async create(subCommittee: SubCommitteeDto) {
    const mainCommittee = await this.committee.findById(
      subCommittee.mainCommitteeId,
    );

    if (!mainCommittee)
      throw new UnprocessableEntityException("Main committee doesn't exists");

    return this.prisma.subCommittee.create({
      data: {
        name: subCommittee.name,
        description: subCommittee.description,
        mainCommitteeId: subCommittee.mainCommitteeId,
      },
    });
  }

  async getByCommittee(committeeId: number) {
    return this.prisma.subCommittee.findMany({
      where: {
        mainCommitteeId: committeeId,
      },
    });
  }

  async getAll(organizationId: number) {
    return this.prisma.subCommittee.findMany({
      where: {
        Committee: {
          organizationId,
        },
      },
    });
  }
}
