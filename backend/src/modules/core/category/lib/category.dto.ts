import { IsOptional, IsString, MinLength } from 'class-validator';

export class CategoryDto {
  @IsString()
  @MinLength(2, { message: 'Category name should at least 2 chars long.' })
  name!: string;

  @IsString()
  @IsOptional()
  description!: string;
}
