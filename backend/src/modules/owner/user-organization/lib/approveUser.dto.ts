import { UserRole } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class ApproveUserDto {
  @IsNumber()
  userId!: number;
  @IsNumber()
  organizationId!: number;
  @IsEnum(UserRole, { message: 'Invalid user role' })
  role!: UserRole;
}
