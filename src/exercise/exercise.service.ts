import {
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import {
  validataionTwoValueNullORUndefined,
  validationNullORUndefined,
} from 'src/share/utils/validation.util';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entity';
import { BoardDto } from './dto/board.dto';
import { Board } from './entities/Board.entity';
import { Exercise } from './entities/exercise.entity';
import { BoardRepository } from './repositories/board.repository';
import { CommentRepository } from './repositories/comment.repository';
import { ExeriseRepository } from './repositories/exercise.repository';

@Injectable()
export class ExerciseService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly exerciseRepository: ExeriseRepository,
    private readonly boardRepository: BoardRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  public async findExercise(param): Promise<Exercise> {
    const exercise: undefined | Exercise =
      await this.exerciseRepository.findOne(param.id);

    return exercise;
  }

  public async addExBaord(user: User, dto: BoardDto, param): Promise<void> {
    const boardNumer = await this.boardRepository.find({
      where: { exercise: param },
    });
    const exercise = await this.exerciseRepository.findOne(param);

    if (validationNullORUndefined(exercise)) {
      throw new NotFoundException('존재하지 않는 운동입니다.');
    }

    const board = this.boardRepository.create(dto);

    console.log(boardNumer.length);
    board.id = param + '_' + String(1 + boardNumer.length);
    board.craetedAt = new Date();
    board.exercise = exercise;
    board.user = user;

    await this.boardRepository.save(board);
  }

  public async findBoard(param): Promise<Board[]> {
    const board: undefined | Board[] = await this.boardRepository.find({
      where: { exercise: param },
      relations: ['user'],
    });

    return board;
  }

  public async findBoardOne(param): Promise<Board> {
    const board: undefined | Board = await this.boardRepository.findBoard(
      param.id,
      param.boardId,
    );

    if (validationNullORUndefined(board)) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    return board;
  }

  public async putBoard(user: User, dto: BoardDto, param): Promise<void> {
    const board: undefined | Board = await this.boardRepository.findBoard(
      param.id,
      param.boardId,
    );

    if (validationNullORUndefined(board)) {
      throw new NotFoundException('존재하지 않는 게시글입니다.');
    }

    if (validataionTwoValueNullORUndefined(board.user.id, user.id)) {
      throw new UnauthorizedException('게시글이 다른 소유자 입니다.');
    }

    const putBoard = this.boardRepository.merge(board, dto);
    await this.boardRepository.save(putBoard);
  }

  public async deleteBoard(user: User, param): Promise<void> {
    const board: undefined | Board = await this.boardRepository.findBoard(
      param.id,
      param.boardId,
    );

    if (validataionTwoValueNullORUndefined(board.user.id, user.id)) {
      throw new UnauthorizedException('게시글이 다른 소유자 입니다.');
    }

    await this.boardRepository.remove(board);
  }
}
