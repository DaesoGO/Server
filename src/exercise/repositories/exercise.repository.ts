import { EntityRepository, Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';

@EntityRepository(Exercise)
export class ExeriseRepository extends Repository<Exercise> {
  public exercisefindtwo(): Promise<Exercise[] | undefined> {
    return this.createQueryBuilder('exercise')
      .select()
      .where('exercise.title = :title', { title: 'pushup' })
      .orWhere('exercise.title = :title2', { title2: 'squat' })
      .getMany();
  }
}
