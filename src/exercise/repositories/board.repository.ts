import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/Board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
