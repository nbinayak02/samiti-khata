import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';

export class UpdateBookStatusDto {
  @ApiProperty({
    enum: BookStatus,
  })
  @IsEnum(BookStatus)
  status!: BookStatus;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(1, { message: 'Invalid user id' })
  assignedTo?: number;

  @ApiPropertyOptional()
  @IsDateString()
  assignedAt?: Date;

  @ApiPropertyOptional()
  @IsDateString()
  returnedAt?: Date;
}
