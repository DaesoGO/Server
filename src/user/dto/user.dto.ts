import { IsEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmpty()
  id!: string;

  @IsString()
  @IsEmpty()
  nickname!: string;

  @IsString()
  @IsEmpty()
  password!: string;

  @IsString()
  @IsEmpty()
  sex!: string;

  @IsString()
  @IsEmpty()
  age!: string;

  @IsString()
  @IsEmpty()
  interest!: string;

  @IsString()
  @IsEmpty()
  diary_pu_yn!: boolean;
}
