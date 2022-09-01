import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { User } from 'src/user/entities/user.entity';
import { BoardDto } from './dto/board.dto';
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
    const exercise = await this.exerciseRepository.findOne(param.id);

    return exercise;
  }

  public async addExBaord(user: User, dto: BoardDto, param): Promise<void> {
    console.log('a');
  }
}
