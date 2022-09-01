import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { User } from 'src/user/entities/user.entity';
import { BoardDto } from './dto/board.dto';
import { Exercise } from './entities/exercise.entity';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findExercise(@Param() param): Promise<DataResponse<Exercise>> {
    const list: undefined | Exercise = await this.exerciseService.findExercise(
      param,
    );

    return DataResponse.dataSuccesss('운동 불러오기 성공', list);
  }

  @UseGuards(AuthGuard)
  @Post('/:id')
  async addExBoard(
    @Token() user: User,
    @Body() dto: BoardDto,
    @Param() param,
  ): Promise<Response> {
    await this.exerciseService.addExBaord(user, dto, param);

    return Response.success('게시글이 생성되었습니다.');
  }
}
