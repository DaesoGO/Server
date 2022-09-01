import { IsEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsEmpty()
  content!: string;
}
