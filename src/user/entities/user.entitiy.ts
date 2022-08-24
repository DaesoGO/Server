import { Diary } from 'src/diary/entities/diary.entitiy';
import { Column, Entity, JoinTable, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ length: 50 })
  nickname: string;

  @Column({ length: 200 })
  password: string;

  @Column({ length: 2 })
  sex: string;

  @Column({ length: 10 })
  age: string;

  @Column({ length: 200 })
  interest: string;

  @OneToMany(() => Diary, (diary) => diary.user)
  diary: Diary[];
}
