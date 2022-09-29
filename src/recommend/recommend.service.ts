import { Injectable, NotFoundException } from '@nestjs/common';
import { Exercise } from 'src/exercise/entities/exercise.entity';
import { ExeriseRepository } from 'src/exercise/repositories/exercise.repository';
import { checkHour, randomize } from 'src/share/utils/function.utils';
import { validationNullORUndefined } from 'src/share/utils/validation.util';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repositories/user.repository';
import { Recommend } from './entities/recommend.entity';
import { FruitRepository } from './repositories/fruit.repository';
import { RecommendRepository } from './repositories/recommend.repository';

@Injectable()
export class RecommendService {
  constructor(
    private readonly fruitRepository: FruitRepository,
    private readonly recommendRepository: RecommendRepository,
    private readonly userRepositroy: UserRepository,
    private readonly exeriseRepository: ExeriseRepository,
  ) {}

  public async recommendEx(): Promise<Exercise[]> {
    return await this.exeriseRepository.exercisefindtwo();
  }

  public async recommendFr(user: User): Promise<any> {
    const findUser: undefined | User = await this.userRepositroy.findOne({
      id: user.id,
    });

    if (validationNullORUndefined(findUser)) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const findRecommend: undefined | Recommend =
      await this.recommendRepository.findOne({ user: findUser });
    const fruitRandom = await this.fruitRepository.fruitRandomThree();

    if (validationNullORUndefined(findRecommend.fruitsName)) {
      await this.recommendRepository.update(findRecommend, {
        fruitsName: fruitRandom.map((name) => name.name).join('/'),
      });
    }

    if (findRecommend.hour != checkHour()) {
      await this.recommendRepository.update(findRecommend, {
        fruitsName: fruitRandom.map((name) => name.name).join('/'),
      });
    }

    const updateRecommend: undefined | Recommend =
      await this.recommendRepository.findOne({ user: findUser });

    await this.recommendRepository.update(updateRecommend, {
      hour: checkHour(),
    });
    return this.fruitRepository.fruitfindThree(updateRecommend);
  }
}
