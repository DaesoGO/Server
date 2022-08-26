import { IsDate, IsEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entitiy';

export class diaryDto {
  @IsString()
  @IsEmpty()
  content!: string;

  @IsString()
  @IsEmpty()
  photo!: string;

  @IsDate()
  createdAt: Date;

  @IsString()
  userId: User;
}
