import {
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class AuthorizedOrgMemberDto {
  @IsString()
  @MinLength(2, { message: 'Name should be at least 2 chars long' })
  name!: string;

  @IsString()
  @IsOptional()
  address!: string;

  @IsNumberString()
  @Length(10, 10)
  @IsOptional()
  phone!: string;
}
