import { IsEmpty, IsString } from 'class-validator';

export class BoardDto {
  @IsString()
  @IsEmpty()
  content!: string;
}
