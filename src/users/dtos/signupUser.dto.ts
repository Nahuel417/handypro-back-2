import { IsString, IsEmail, Length, IsStrongPassword } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsString()
  @Length(1, 50)
  fullname: string;

  @IsStrongPassword()
  @IsString()
  @Length(1, 50)
  password: string;

  @IsString()
  @Length(1, 100)
  confirmationPassword: string;
}