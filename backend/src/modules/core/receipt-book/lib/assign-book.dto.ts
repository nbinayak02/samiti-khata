import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AssignBookDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Invalid user id' })
  assignedTo!: number;

  @IsDateString()
  @IsNotEmpty()
  assignedAt!: Date;
}
