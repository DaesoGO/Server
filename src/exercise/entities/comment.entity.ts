import {
  Column,
  Entity,
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
  board: Board;
}
