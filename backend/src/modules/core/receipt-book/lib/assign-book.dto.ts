import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AssignBookDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'Invalid user id' })
  assignedTo!: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  assignedAt!: Date;
}
