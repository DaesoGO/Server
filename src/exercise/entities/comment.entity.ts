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
import { Exercise } from './exercise.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ name: 'co_id' })
  id: number;

  @Column({ name: 'co_content' })
  content: string;

  @Column({ name: 'co_createAt' })
  createdAt: Date;

  @ManyToOne(() => Board, (board) => board.comments)
  @JoinColumn({ name: 'FK_board' })
  board: Board;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'FK_user' })
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.comments)
  @JoinColumn({ name: 'FK_exercise' })
  exercise: Exercise;
}
