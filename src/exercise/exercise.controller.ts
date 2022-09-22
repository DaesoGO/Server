import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Token } from 'src/common/decorators/token.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import Response from 'src/common/response/response';
import { User } from 'src/user/entities/user.entity';
import { BoardDto } from './dto/board.dto';
import { CommentDto } from './dto/comment.dto';
import { Board } from './entities/Board.entity';
import { Exercise } from './entities/exercise.entity';
import { ExerciseService } from './exercise.service';

@ApiTags('Exercise')
@Controller('/api/ex')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  // @UseGuards(AuthGuard)
  @Get('/:id')
  async findExercise(@Param() param): Promise<DataResponse<Exercise>> {
    const list: undefined | Exercise = await this.exerciseService.findExercise(
      param,
    );

    return DataResponse.dataSuccesss('운동 불러오기 성공', list);
  }

  @UseGuards(AuthGuard)
  @Post(':id/board')
  async addExBoard(
    @Token() user: User,
    @Body() dto: BoardDto,
    @Param() param,
  ): Promise<Response> {
    await this.exerciseService.addExBaord(user, dto, param.id);

    return Response.success('게시글이 생성되었습니다.');
  }

  // @UseGuards(AuthGuard)
  @Get('/:id/board')
  async findBoard(@Param() param): Promise<DataResponse<Board[]>> {
    const list: undefined | Board[] = await this.exerciseService.findBoard(
      param.id,
    );

    return DataResponse.dataSuccesss('운동 게시글 불어오기 성공', list);
  }

  @UseGuards(AuthGuard)
  @Get('/:id/board/:boardId')
  async findBoardOne(@Param() param): Promise<DataResponse<Board>> {
    const list: undefined | Board = await this.exerciseService.findBoardOne(
      param,
    );

    return DataResponse.dataSuccesss('운동 상세 게시글 불어오기 성공', list);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/:boardId/board')
  async putBoard(
    @Token() user: User,
    @Body() dto: BoardDto,
    @Param() param,
  ): Promise<Response> {
    await this.exerciseService.putBoard(user, dto, param);

    return Response.success('운동 게시글 수정 성공');
  }

  @UseGuards(AuthGuard)
  @Delete('/:id/board/:boardId')
  async deleteBoard(@Token() user: User, @Param() param): Promise<Response> {
    await this.exerciseService.deleteBoard(user, param);

    return Response.success('운동 게시글 삭제 성공');
  }

  @UseGuards(AuthGuard)
  @Post('/:id/comment/:boardId')
  async addComment(
    @Token() user: User,
    @Body() dto: CommentDto,
    @Param() param,
  ): Promise<Response> {
    await this.exerciseService.addComment(user, dto, param);

    return Response.success('댓글이 생성되었습니다.');
  }

  @UseGuards(AuthGuard)
  @Delete('/comment')
  async deleteComment(
    @Token() user: User,
    @Body() id: number,
  ): Promise<Response> {
    await this.exerciseService.deleteComment(user, id);

    return Response.success('게시글 댓글 삭제 성공');
  }
}
