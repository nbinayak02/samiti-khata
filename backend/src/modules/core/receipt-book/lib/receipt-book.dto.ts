import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { IsGreaterThan } from '../../../../common/customDtoDecorator/isGreaterThan.decorator';

export class ReceiptBookDto {
  @ApiProperty()
  @IsNumber()
  @Min(1, { message: 'Receipt Book Number should start from 1.' })
  bookNumber!: number;

  @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Receipt Starting Number should start from 1.' })
  receiptStartingNumber!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('receiptStartingNumber')
  receiptEndingNumber!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  fiscalYearId!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  assignedTo?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  assignedAt?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  returnedAt?: Date;
}
