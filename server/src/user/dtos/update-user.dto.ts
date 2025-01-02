import { IsEmail, IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateUserDto {
  name: string;

  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  phone_num?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
