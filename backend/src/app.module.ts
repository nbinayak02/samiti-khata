import { Module } from '@nestjs/common';
import { AuthModule } from '@shared/auth';
import { AppService } from './app.service';
import { UsersModule } from '@shared/users';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/prisma';
import { AppController } from './app.controller';
import { CommitteeModule } from '@core/committee';
import { OrganizationModule } from '@owner/organization/index';
import { UserOrganizationModule } from '@owner/user-organization';
import { UserSessionModule, UserSessionService } from '@shared/user-session';
import { SubCommitteeModule } from './modules/core/sub-committee/sub-committee.module';
import { AuthorizedOrgMemberModule } from './modules/core/authorized-org-member/authorized-org-member.module';
import { CategoryModule } from './modules/core/category/category.module';
import { ExpenseModule } from './modules/core/expense/expense.module';
import { IncomeModule } from './modules/core/income/income.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    PrismaModule,
    UserSessionModule,
    OrganizationModule,
    UserOrganizationModule,
    CommitteeModule,
    SubCommitteeModule,
    AuthorizedOrgMemberModule,
    CategoryModule,
    ExpenseModule,
    IncomeModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserSessionService],
})
export class AppModule {}
