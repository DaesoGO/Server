import { EntityRepository, Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';

@EntityRepository(Exercise)
export class ExeriseRepository extends Repository<Exercise> {
  public exercisefindtwo(): Promise<Exercise[] | undefined> {
    return this.createQueryBuilder('exercise')
      .select()
      .where('exercise.title = :title', { title: '팔굽혀 퍼기' })
      .orWhere('exercise.title = :title2', { title2: '스쿼트' })
      .getMany();
  }
}
