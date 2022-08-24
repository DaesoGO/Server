import { Body, Controller, Get, Query } from '@nestjs/common';
import Response from 'src/common/response/response';
import { DiaryService } from './diary.service';
import { diaryDto } from './dto/diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('upload')
  async diaryUpload(@Body() dto: diaryDto) {
    await this.diaryService.diaryUpload(dto);

    return Response.success('글 등록 성공');
  }
}
