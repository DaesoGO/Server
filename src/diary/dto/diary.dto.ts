import { IsDate, IsEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class diaryDto {
  @IsString()
  @IsEmpty()
  content!: string;

  @IsString()
  @IsEmpty()
  exercise!: string;

  @IsString()
  @IsEmpty()
  part!: string;

  @IsString()
  @IsEmpty()
  photo!: string;

  @IsDate()
  createdAt: string;
}
