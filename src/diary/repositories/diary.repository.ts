import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Diary } from '../entities/diary.entitiy';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {
  public findListInfo(userId: string): Promise<Diary[]> {
    return this.createQueryBuilder('diary')
      .select(['diary.photo', 'diary.id', 'diary.createdAt'])
      .where('diary.userId = :userId', { userId })
      .getMany();
  }

  public async findListOneInfo(id: number): Promise<Diary> {
    return this.createQueryBuilder('diary')
      .where('diary.id = :id', { id })
      .getOne();
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
