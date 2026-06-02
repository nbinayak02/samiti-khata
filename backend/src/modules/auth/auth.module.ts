import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategy } from './jwtAccess.strategies';
import { PassportModule } from '@nestjs/passport';
import { UserSessionModule } from '../user-session/user-session.module';
import { UserOrganizationModule } from '../user-organization/user-organization.module';
import { JwtRefreshTokenStrategy } from './jwtRefresh.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.register({}),
    UserSessionModule,
    UserOrganizationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule {}
