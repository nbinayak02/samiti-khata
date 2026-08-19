import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CursorPaginationDto {
  @ApiProperty()
  @IsNumber()
  cursor?: number;

  @ApiProperty()
  @IsNumber()
  limit: number = 10;
}
