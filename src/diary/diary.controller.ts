import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Token } from 'src/common/decorators/token.decorator';
import Response from 'src/common/response/response';
import { User } from 'src/user/entities/user.entitiy';
import { DiaryService } from './diary.service';
import { diaryDto } from './dto/diary.dto';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post('/:id/upload')
  async diaryUpload(@Param() param, @Body() dto: diaryDto) {
    console.log(param.id);
    //await this.diaryService.diaryUpload(dto);

    return Response.success('글 등록 성공');
  }
}
