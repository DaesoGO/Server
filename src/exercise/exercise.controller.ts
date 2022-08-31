import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import DataResponse from 'src/common/response/DataResponse';
import { Exercise } from './entities/exercise.entity';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  //   @UseGuards(AuthGuard)
  //   @Get('/:id')
  //   async findExercise(@Param() param) : Promise<DataResponse<Exercise>> {
  //     const list | undefined | Exercise = await this.exerciseService.findExercise()
  //   }
}
