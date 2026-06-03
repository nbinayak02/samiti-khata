import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class SubCommitteeDto {
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 chars long.' })
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;

  @IsNumber()
  mainCommitteeId!: number;
}
