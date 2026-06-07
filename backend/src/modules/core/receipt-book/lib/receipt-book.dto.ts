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
  @IsNumber()
  @Min(1, { message: 'Receipt Book Number should start from 1.' })
  bookNumber!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Receipt Starting Number should start from 1.' })
  receiptStartingNumber!: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('receiptStartingNumber')
  receiptEndingNumber!: number;

  @IsNotEmpty()
  @IsNumber()
  fiscalYearId!: number;

  @IsOptional()
  @IsNumber()
  assignedTo?: number;

  @IsOptional()
  @IsDateString()
  assignedAt?: Date;

  @IsOptional()
  @IsDateString()
  returnedAt?: Date;
}
