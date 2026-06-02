import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
      // extract JWT from cookies instead of Authorization header
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let token = null;
          if (request && request.cookies) {
            token = request.cookies['accessToken'] as string;
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET || 'ASDHL(!*!%%(!@*(^&@',
    });
  }

  // if jwt is valid, this validate method will be called with the decoded payload
  async validate(payload: { sub: number; email: string; role: string }) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
