import { Diary } from 'src/diary/entities/diary.entitiy';
import { Board } from 'src/exercise/entities/Board.entity';
import { Comment } from 'src/exercise/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

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

  @Column()
  diary_pu_yn: boolean;

  @OneToMany(() => Diary, (diary) => diary.user)
  diary: Diary[];

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
