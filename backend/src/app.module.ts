import { Module } from '@nestjs/common';
import { AuthModule } from '@shared/auth';
import { AppService } from './app.service';
import { UsersModule } from '@shared/users';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/prisma';
import { AppController } from './app.controller';
import { OrganizationModule } from '@owner/organization/index';
import { UserOrganizationModule } from '@shared/user-organization';
import { UserSessionModule, UserSessionService } from '@shared/user-session';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    AuthModule,
    UsersModule,
    PrismaModule,
    UserSessionModule,
    OrganizationModule,
    UserOrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserSessionService],
})
export class AppModule {}
