import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class IncomeDto {
  @IsString()
  @IsNotEmpty({ message: 'Bill number is required' })
  billNumber!: string;

  @IsString()
  @IsNotEmpty({ message: 'Book number is required' })
  bookNumber!: string;

  @IsDateString({}, { message: 'Invalid date format' })
  date!: Date;

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Nepali date must be in YYYY-MM-DD format',
  })
  nepaliDate!: string;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Address is required' })
  address!: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message:
      'Amount must be a valid number upto 2 decimal places, e.g. 100 or 100.50',
  })
  @Transform(({ value }) => Number(value))
  @Min(1, { message: 'Amount must be greater than 0' })
  amount!: number;

  @IsNumber({}, { message: 'Committee is required' })
  committeeId!: number;

  @IsOptional()
  @IsNumber({}, { message: 'Bill issuer ID must be a number' })
  billIssuerId!: number;

  @IsOptional()
  @IsNumber({}, { message: 'Sub-Committee ID must be a number' })
  subCommitteeId!: number;

  @IsOptional()
  @IsString()
  billImageUrl!: string;

  @IsOptional()
  @IsString()
  remarks!: string;
}

export class UpdateIncomeDto extends IncomeDto {
  @IsString()
  @MinLength(2, { message: 'Description should be at least 2 chars long.' })
  description!: string;
}
