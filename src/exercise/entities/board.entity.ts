import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { Exercise } from './exercise.entity';

@Entity()
export class Board {
  @PrimaryColumn()
  id: string;

  @Column({ length: 10000 })
  content: string;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @ManyToOne(() => Exercise, (exercise) => exercise.Boards)
  exercise: Exercise;

  @ManyToOne(() => User, (user) => user.Boards)
  user: User;
}
