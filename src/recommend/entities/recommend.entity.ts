import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recommend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  exercisesName: string;

  @Column()
  fruitsName: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
