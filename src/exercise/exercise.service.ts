import { Injectable } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { Exercise } from './entities/exercise.entity';
import { ExeriseRepository } from './repositories/exercise.repository';

@Injectable()
export class ExerciseService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly exerciseRepository: ExeriseRepository,
  ) {}

  //   public async findExercise(): Promise<Exercise> {
  //     const exercise = await this.exerciseRepository.find()
  //   }
}
