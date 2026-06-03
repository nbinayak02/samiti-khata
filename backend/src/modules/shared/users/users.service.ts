import { ConflictException, Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { SignupDto } from '@shared/auth';
import { PrismaService } from '@shared/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
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
