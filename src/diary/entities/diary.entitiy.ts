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
  @PrimaryGeneratedColumn({ name: 'di_id' })
  id: number;

  @Column({ length: 6000, name: 'di_content' })
  content: string;

  @Column({ length: 300, name: 'di_photo' })
  photo: string;

  @Column({ name: 'di_createAt' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.diary, { nullable: false })
  user: User;
}
