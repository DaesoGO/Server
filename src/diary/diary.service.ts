import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { diaryDto } from './dto/diary.dto';

@Injectable()
export class DiaryService {
  constructor(private readonly tokenService: TokenService) {}

  public async diaryUpload(dto: diaryDto): Promise<void> {
    console.log('a');
  }
}
