import { randomize } from 'src/share/utils/function.utils';
import { EntityRepository, Repository } from 'typeorm';
import { Fruit } from '../entities/fruit.entity';

@EntityRepository(Fruit)
export class FruitRepository extends Repository<Fruit> {
  public fruitRandomThree(): Promise<Fruit[] | undefined> {
    const fruitRandom: Array<number> = randomize(10, 3);
    const fruitRandomFi = fruitRandom[0],
      fruitRandomSe = fruitRandom[1],
      fruitRandomTh = fruitRandom[2];

    return this.createQueryBuilder('fruit')
      .select(['fruit.name'])
      .where('fruit.id = :fruitRandomFi', { fruitRandomFi })
      .orWhere('fruit.id = :fruitRandomSe', { fruitRandomSe })
      .orWhere('fruit.id = :fruitRandomTh', { fruitRandomTh })
      .getMany();
  }

  public fruitfindThree(recommendInfo) {
    const fruit = recommendInfo.fruitsName.split('/');
    const fruitRandomFi = fruit[0],
      fruitRandomSe = fruit[1],
      fruitRandomTh = fruit[2];

    return this.createQueryBuilder('fruit')
      .select(['fruit.name', 'fruit.content', 'fruit.img'])
      .where('fruit.name = :fruitRandomFi', { fruitRandomFi })
      .orWhere('fruit.name = :fruitRandomSe', { fruitRandomSe })
      .orWhere('fruit.name = :fruitRandomTh', { fruitRandomTh })
      .getMany();
  }
}
