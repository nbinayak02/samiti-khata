import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@shared/prisma';
import { AppController } from './app.controller';
import {
  AuthModule,
  UserOrganizationModule,
  UserSessionModule,
  UserSessionService,
  UsersModule,
} from '@shared/index';

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
