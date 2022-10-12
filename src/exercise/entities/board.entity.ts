import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Exercise } from './exercise.entity';

@Entity()
export class Board {
  @PrimaryColumn({ name: 'bo_id' })
  id: string;

  @Column({ name: 'bo_title' })
  title: string;

  @Column({ length: 10000, name: 'bo_content' })
  content: string;

  @Column({ name: 'createAt' })
  craetedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @ManyToOne(() => Exercise, (exercise) => exercise.boards)
  @JoinColumn({ name: 'FK_exercise' })
  exercise: Exercise;

  @ManyToOne(() => User, (user) => user.boards)
  @JoinColumn({ name: 'FK_user' })
  user: User;
}
