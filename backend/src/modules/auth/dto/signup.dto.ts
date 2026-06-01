import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(2, { message: 'Full name must be at least 2 characters long' })
  fullName!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsString()
  @MinLength(2, { message: 'Address must be at least 2 characters long' })
  address!: string;

  @IsString()
  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long',
  })
  phoneNumber!: string;
}
