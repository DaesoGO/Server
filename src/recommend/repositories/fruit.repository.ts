import { EntityRepository, Repository } from 'typeorm';
import { Fruit } from '../entities/fruit.entity';

@EntityRepository(Fruit)
export class FruitRepository extends Repository<Fruit> {}
