import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GetQueryDto } from '../../../../common/queryString.dto';

export class IncomeQueryDto extends GetQueryDto {
  @ApiPropertyOptional({
    description: 'Receipt Book ID',
  })
  @IsString()
  receiptBookId: string = '';

  @ApiPropertyOptional({
    description: 'Committee ID',
  })
  @IsString()
  committeeId: string = '';
}
