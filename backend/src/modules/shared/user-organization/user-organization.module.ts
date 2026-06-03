import { Module } from '@nestjs/common';
import { UserOrganizationService } from './user-organization.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UserOrganizationService, PrismaService],
  exports: [UserOrganizationService],
})
export class UserOrganizationModule {}
