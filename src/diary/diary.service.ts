import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { diaryDto } from './dto/diary.dto';
import { Diary } from './entities/diary.entitiy';
import { DiaryRepository } from './repositories/diary.repository';

@Injectable()
export class DiaryService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly diaryRepository: DiaryRepository,
  ) {}

  public async diaryUpload(dto: diaryDto): Promise<void> {
    const today = new Date();

    dto.createdAt = today;

    await this.diaryRepository.save(dto);
  }
}
