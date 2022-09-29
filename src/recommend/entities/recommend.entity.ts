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
  @PrimaryGeneratedColumn({ name: 're_id' })
  id: number;

  @Column({ name: 're_hour' })
  hour: string;

  @Column({ nullable: true, name: 're_exercisesName' })
  exercisesName: string;

  @Column({ nullable: true, name: 're_fruitsName' })
  fruitsName: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'FK_user' })
  user: User;
}
