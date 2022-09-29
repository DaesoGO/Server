import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './Board.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ name: 'co_id' })
  id: string;

  @Column({ name: 'co_content' })
  content: string;

  @Column({ name: 'createAt' })
  createdAt: Date;

  @ManyToOne(() => Board, (board) => board.comments)
  @JoinColumn({ name: 'FK_board' })
  board: Board;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'FK_user' })
  user: User;
}
