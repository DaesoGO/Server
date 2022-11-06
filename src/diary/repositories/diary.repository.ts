import { EntityRepository, Repository } from 'typeorm';
import { Diary } from '../entities/diary.entitiy';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {
  public findListInfo(userId: string): Promise<Diary[] | undefined> {
    return this.createQueryBuilder('diary')
      .select(['diary.id', 'diary.photo', 'diary.createdAt', 'diary.photo'])
      .where('diary.FK_user = :userId', { userId })
      .getMany();
  }

  public async findListOneInfo(createdAt: number): Promise<Diary | undefined> {
    return this.createQueryBuilder('diary')
      .leftJoinAndSelect('diary.user', 'user')
      .where('diary.createdAt = :createdAt', { createdAt })
      .getOne();
  }

  public async findfilter(
    userId: string,
    number: number,
  ): Promise<Diary[] | undefined> {
    return this.createQueryBuilder('diary')
      .select(['diary.id', 'diary.photo', 'diary.createdAt', 'diary.photo'])
      .where('diary.FK_user = :userId', { userId })
      .take(number + 10)
      .skip(number)
      .getMany();
  }

  //    public async findtesting(sex : string){
  //     const test = thist.createQueryBuilder("user")
  //     .where("user.registered = :registered", { registered: true })
  //     .andWhere(
  //         new NotBrackets((qb) => {
  //             qb.where("user.firstName = :firstName", {
  //                 firstName: "Timber",
  //             }).orWhere("user.lastName = :lastName", { lastName: "Saw" })
  //         }),
  //     )
  //    }
}
