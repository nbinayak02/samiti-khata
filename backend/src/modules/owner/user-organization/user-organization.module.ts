import { Module } from '@nestjs/common';
import { UserOrganizationService } from './user-organization.service';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UserOrganizationController } from './user-organization.controller';
import { UsersModule } from '@shared/users';
import { OrganizationService } from '@owner/organization';

@Module({
  imports: [UsersModule],
  providers: [UserOrganizationService, PrismaService, OrganizationService],
  exports: [UserOrganizationService],
  controllers: [UserOrganizationController],
})
export class UserOrganizationModule {}
