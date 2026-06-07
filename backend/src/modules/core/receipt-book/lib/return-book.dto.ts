import { IsDateString, IsNotEmpty } from 'class-validator';

export class ReturnBookDto {
  @IsDateString()
  @IsNotEmpty()
  returnedAt!: Date;
}
