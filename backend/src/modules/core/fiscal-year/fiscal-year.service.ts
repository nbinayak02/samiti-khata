import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';
import { FiscalYearDto } from './lib/fiscal-year.dto';

@Injectable()
export class FiscalYearService {
  constructor(private readonly prisma: PrismaService) {}

  async create(fiscalYearDto: FiscalYearDto, organizationId: number) {
    const startDateYear = fiscalYearDto.startDateBs.split('-')[0];
    const endDateYear = fiscalYearDto.endDateBs.split('-')[0];
    const name = `${startDateYear}/${endDateYear}`;
    return await this.prisma.fiscalYear.create({
      data: {
        name,
        startDateBs: fiscalYearDto.startDateBs,
        endDateBs: fiscalYearDto.endDateBs,
        startDateIso: fiscalYearDto.startDateIso,
        endDateIso: fiscalYearDto.endDateIso,
        organizationId,
      },
    });
  }

  async getByOrg(organizationId: number) {
    return await this.prisma.fiscalYear.findMany({
      where: {
        organizationId,
      },
    });
  }
}
