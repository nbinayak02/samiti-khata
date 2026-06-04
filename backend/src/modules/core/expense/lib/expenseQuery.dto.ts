import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { type SortDirection } from '../../../../common/types';
import { Transform } from 'class-transformer';

enum SortDirn {
  'asc',
  'desc',
}

export class GetExpensesQueryDto {
  @IsNumber()
  @IsOptional()
  @Transform((n) => Number(n))
  @Min(1)
  pageSize?: number = 10;

  @IsNumber()
  @IsOptional()
  @Transform((n) => Number(n))
  @Min(1)
  pageNumber?: number = 1;

  @IsEnum(SortDirn)
  @IsOptional()
  sortDir?: SortDirection = 'desc';
}
