import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { type SortDirection } from './types';
import { Transform } from 'class-transformer';

enum SortDirn {
  'asc',
  'desc',
}

export class GetQueryDto {
  @ApiPropertyOptional({ default: 10, description: 'Page size' })
  @IsNumber()
  @IsOptional()
  @Transform((n) => Number(n))
  @Min(1)
  pageSize?: number = 10;

  @ApiPropertyOptional({ default: 1, description: 'Page number' })
  @IsNumber()
  @IsOptional()
  @Transform((n) => Number(n))
  @Min(1)
  pageNumber?: number = 1;

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'desc',
    description: 'Sort direction',
  })
  @IsEnum(SortDirn)
  @IsOptional()
  sortDir?: SortDirection = 'desc';
}
