import { IsEmpty, IsString } from 'class-validator';

export class diaryDto {
  @IsString()
  @IsEmpty()
  content!: string;

  @IsString()
  @IsEmpty()
  photo!: string;
}
