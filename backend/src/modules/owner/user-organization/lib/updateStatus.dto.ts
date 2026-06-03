import { UserStatus } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(UserStatus, { message: 'Unknown Status' })
  status!: UserStatus;

  @IsNumber()
  userId!: number;
}
