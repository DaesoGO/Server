import { Injectable, NotFoundException } from '@nestjs/common';
import { randomize } from 'src/share/utils/function.utils';
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
  ) {}

  public async recommendExAndFr(user: User): Promise<any> {
    const findUser: undefined | User = await this.userRepositroy.findOne({
      id: user.id,
    });

    if (validationNullORUndefined(findUser)) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const findRecommend: undefined | Recommend =
      await this.recommendRepository.findOne({ user: findUser });

    if (validationNullORUndefined(findRecommend.exercisesName)) {
      const fruitRandom = await this.fruitRepository.fruitRandomThree();

      //console.log(fruitRandom.map((x) => x.name).join('/'));

      await this.recommendRepository.update(findRecommend, {
        fruitsName: fruitRandom.map((name) => name.name).join('/'),
      });
    }
  }
}
