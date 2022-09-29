import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { User } from 'src/user/entities/user.entity';
import { DiaryService } from './diary.service';
import { diaryDto } from './dto/diary.dto';
import { Diary } from './entities/diary.entitiy';

@Controller('api/diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @UseGuards(AuthGuard)
  @Post('/:id')
  async diaryUpload(
    @Token() user: User,
    @Body() dto: diaryDto,
  ): Promise<Response> {
    await this.diaryService.diaryUpload(user, dto);

    return Response.success('글 등록 성공');
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async diaryList(
    @Token() user: User,
    @Param() param,
  ): Promise<DataResponse<Diary[]>> {
    const list = await this.diaryService.diaryList(user, param.id);

    return DataResponse.dataSuccesss('조회 성공', list);
  }

  @UseGuards(AuthGuard)
  @Get('/:userid/:id')
  async diaryListOne(
    @Token() user: User,
    @Param() param,
  ): Promise<DataResponse<Diary>> {
    const listOne = await this.diaryService.diaryListOne(user, param);

    return DataResponse.dataSuccesss('조회 성공', listOne);
  }

  // @UseGuards(AuthGuard)
  // @Put('/:userid/id')
  // async diaryUpdate(
  //   @Token() user: User,
  //   @Body() dto: diaryDto,
  //   @Param() param,
  // ): Promise<Response> {
  //   await this.diaryService.diaryUpdate(user, dto, param);

  //   return Response.success('글 정보 수정');
  // }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async diaryDelete(@Token() user: User, @Param() param): Promise<Response> {
    await this.diaryService.diaryDelete(user, param.id);

    return Response.success('일기가 성공적으로 삭제되었습니다.');
  }
}
