import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class OrganizationDto {
  @IsString()
  @MinLength(2, {
    message: 'Organization name should be at least 2 chars long.',
  })
  name!: string;

  @IsEmail({}, { message: 'Invalid email address.' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @MinLength(2, { message: 'Address should be at least 2 chars long' })
  address!: string;

  @IsNumberString()
  @Length(10, 10)
  phoneNumber!: string;
}
