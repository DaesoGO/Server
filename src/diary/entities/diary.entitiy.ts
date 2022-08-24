import { User } from 'src/user/entities/user.entitiy';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn()
  di_id: number;

  @Column({ length: 6000 })
  di_content: string;

  @Column({ length: 300 })
  di_prhoto: string;

  @Column({ length: 50 })
  di_createdAt: string;

  @ManyToOne(() => User, (user) => user.diary, { nullable: false })
  user: User;
}
