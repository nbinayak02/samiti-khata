import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserSessionModule } from './modules/user-session/user-session.module';
import { UserOrganizationModule } from './modules/user-organization/user-organization.module';
import { UserSessionService } from './modules/user-session/user-session.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    AuthModule,
    PrismaModule,
    UserSessionModule,
    UserOrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserSessionService],
})
export class AppModule {}
