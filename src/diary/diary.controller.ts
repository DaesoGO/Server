import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { User } from 'src/user/entities/user.entitiy';
import { DiaryService } from './diary.service';
import { diaryDto } from './dto/diary.dto';
import { Diary } from './entities/diary.entitiy';

@Controller('/diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @UseGuards(AuthGuard)
  @Post('/:id/upload')
  async diaryUpload(
    @Token() user: User,
    @Body() dto: diaryDto,
  ): Promise<Response> {
    await this.diaryService.diaryUpload(user, dto);

    return Response.success('글 등록 성공');
  }

  @UseGuards(AuthGuard)
  @Get('/:id/list')
  async diaryList(
    @Token() user: User,
    @Param() param,
  ): Promise<DataResponse<Diary[]>> {
    const list = await this.diaryService.diaryList(user, param.id);

    return DataResponse.dataSuccesss('조회 성공', list);
  }

  @UseGuards(AuthGuard)
  @Get('/:userid/:id/listOne')
  async diaryListOne(
    @Token() user: User,
    @Param() param,
  ): Promise<DataResponse<Diary>> {
    const listOne = await this.diaryService.diaryListOne(user, param);

    return DataResponse.dataSuccesss('조회 성공', listOne);
  }

  @UseGuards(AuthGuard)
  @Put('/:userid/id/update')
  async diaryUpdate(@Body() dto: diaryDto, @Param() param): Promise<Response> {
    await this.diaryService.diaryUpdate(dto, param);

    return Response.success('글 정보 수정');
  }
}
