import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsInt()
  ci: number;

  @IsString()
  @Length(4, 100)
  username: string;

  @IsEmail()
  email: string;

  @IsInt()
  role_id: number;
}
