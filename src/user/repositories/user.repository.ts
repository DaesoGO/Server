import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async userDiaryPuYn(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .select(['user.diary_pu_yn'])
      .where('user.id = :id', { id })
      .getOne();
  }
}
