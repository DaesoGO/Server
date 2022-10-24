import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { multerDiskOptions } from 'src/common/multer/multer.options';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { DiaryService } from './diary.service';
import { diaryDto } from './dto/diary.dto';
import { Diary } from './entities/diary.entitiy';

@Controller('api/diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get('/exercise')
  async exerciseFindAll(): Promise<DataResponse<Exercise[]>> {
    const exercise = await this.diaryService.exerciseFindAll();

    return DataResponse.dataSuccesss('운동 전체 불러오기', exercise);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', multerDiskOptions))
  @Post('/:id')
  async diaryUpload(
    @Token() user: User,
    @Body() dto: diaryDto,
    @Param() param,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Response> {
    console.log(dto);
    console.log(file);
    await this.diaryService.diaryUpload(user, dto, param.id, file);

    return Response.success('일기 등록 성공');
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async diaryList(
    @Token() user: User,
    @Param() param,
  ): Promise<DataResponse<Diary[]>> {
    const list = await this.diaryService.diaryList(user, param.id);

    return DataResponse.dataSuccesss('전체 조회 성공', list);
  }

  @UseGuards(AuthGuard)
  @Get('/:userid/:time')
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
