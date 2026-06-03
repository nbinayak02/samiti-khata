import { Module } from '@nestjs/common';
import { SubCommitteeController } from './sub-committee.controller';
import { SubCommitteeService } from './sub-committee.service';
import { PrismaService } from '@shared/prisma';

@Module({
  controllers: [SubCommitteeController],
  providers: [SubCommitteeService, PrismaService],
})
export class SubCommitteeModule {}
