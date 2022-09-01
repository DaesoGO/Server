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
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Board, (board) => board.comments)
  @JoinColumn({ name: 'FK_board' })
  board: Board;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'FK_user' })
  user: User;
}
