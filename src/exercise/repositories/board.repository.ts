import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../entities/Board.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  public async findBoard(exercise: string, number: string): Promise<Board> {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where('board.id = :id', { id: exercise + '_' + number })
      .getOne();
  }

  public async findBoardNoJoin(
    exercise: string,
    number: string,
  ): Promise<Board> {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where('board.id = :id', { id: exercise + '_' + number })
      .getOne();
  }

  // public async findWandedOption(exercise: string): Promise<any> {
  //   return this.createQueryBuilder('board')
  //     .Select('baord.exercise = :exercise', { exercise })
  //     .select('bo_id', 'bo_title')
  //     .getMany();
  // }
}
