import { Injectable, NotFoundException } from '@nestjs/common';
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
    const ai: number = Math.floor(Math.random() * 10) + 1;
    const findUser: undefined | User = await this.userRepositroy.findOne({
      id: user.id,
    });

    if (validationNullORUndefined(findUser)) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const findRecommend: undefined | Recommend =
      await this.recommendRepository.findOne({ user: findUser });

    console.log(this.randomize(10, 3));
  }

  public randomize = (size, cnt) => {
    if (cnt > size) {
      return undefined;
    }
    const ret = [];
    while (ret.length < cnt) {
      const temp = Math.floor(Math.random() * size + 1);
      if (ret.indexOf(temp) === -1) {
        ret.push(temp);
      }
    }
    return ret;
  };
}
