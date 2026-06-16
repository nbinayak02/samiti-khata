import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class ReturnBookDto {
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  returnedAt!: Date;
}
