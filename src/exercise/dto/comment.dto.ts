import { IsEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsString()
  @IsEmpty()
  content!: string;
}
