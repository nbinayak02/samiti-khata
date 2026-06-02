import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from '../auth/auth.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(signupDto: SignupDto) {
    const existingUser = await this.findByEmail(signupDto.email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(signupDto.password, salt);

    return this.prisma.user.create({
      data: {
        fullName: signupDto.fullName,
        email: signupDto.email,
        password: hashedPassword,
        address: signupDto.address,
        phoneNumber: signupDto.phoneNumber,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        address: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
