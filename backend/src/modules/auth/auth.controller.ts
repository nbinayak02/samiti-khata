import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './jwtauth.guard';
import { GetUser } from './getUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupDto: SignupDto) {
    const result = await this.authService.signup(signupDto);
    return result;
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    response.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return { message: 'Logout successful' };
  }

  // protected route to get user profile
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: { userId: number; email: string; role: string }) {
    return user;
  }
}
