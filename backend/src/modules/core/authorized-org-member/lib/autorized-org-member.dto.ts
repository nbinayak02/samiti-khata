import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class AuthorizedOrgMemberDto {
  @ApiProperty()
  @IsString()
  @MinLength(2, { message: 'Name should be at least 2 chars long' })
  name!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address!: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @Length(10, 10)
  @IsOptional()
  phone!: string;
}
