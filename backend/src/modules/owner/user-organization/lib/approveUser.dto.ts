import { IsNumber } from 'class-validator';

export class ApproveUserDto {
  @IsNumber()
  userId!: number;
  @IsNumber()
  organizationId!: number;
}
