import { EntityRepository, Repository } from 'typeorm';
import { Fruit } from '../entities/fruit.entity';
import { Recommend } from '../entities/recommend.entity';

@EntityRepository(Recommend)
export class RecommendRepository extends Repository<Recommend> {}
