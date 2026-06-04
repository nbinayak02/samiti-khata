import { PaymentMode } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class ExpenseDto {
  @IsDateString({}, { message: 'Invalid date format' })
  date!: Date;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Nepali date must be in YYYY-MM-DD format',
  })
  nepaliDate!: string;

  @IsString()
  @MinLength(2, { message: 'Recepient Name should be at least 2 chars long.' })
  recepientName!: string;

  @IsString()
  @MinLength(1, { message: 'Address is required' })
  recepientAddress!: string;

  @IsString()
  @MinLength(1, { message: 'Particulars is required' })
  particulars!: string;

  @IsString()
  @IsOptional()
  quantity!: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message:
      'Amount must be a valid number upto 2 decimal places, e.g. 100 or 100.50',
  })
  @Transform(({ value }) => Number(value))
  @Min(1, { message: 'Amount must be greater than 0' })
  amount!: number;

  @IsEnum(PaymentMode)
  paymentMode!: PaymentMode;

  @IsString()
  @IsOptional()
  voucherNumber!: string;

  @IsString()
  @IsOptional()
  billNumber!: string;

  @IsString()
  @IsOptional()
  remarks!: string;

  @IsNumber({}, { message: 'Category is required' })
  categoryId!: number;

  @IsNumber({}, { message: 'Committee is required' })
  committeeId!: number;

  @IsNumber()
  @IsOptional()
  subCommitteeId!: number;

  @IsNumber()
  @IsOptional()
  payerId!: number;
}

export class UpdateExpenseDto extends ExpenseDto {
  @IsString({ message: 'Please provide description for update reason.' })
  @MinLength(5, { message: 'Description should be at least 10 chars long.' })
  description!: string;
}
