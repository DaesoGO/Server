import { Diary } from 'src/diary/entities/diary.entitiy';
import { Board } from 'src/exercise/entities/Board.entity';
import { Comment } from 'src/exercise/entities/comment.entity';
import { Recommend } from 'src/recommend/entities/recommend.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ length: 50, name: 'us_id' })
  id: string;

  @Column({ length: 50, name: 'us_nickname' })
  nickname: string;

  @Column({ length: 200, name: 'us_password' })
  password: string;

  @Column({ length: 2, name: 'us_sex' })
  sex: string;

  @Column({ length: 10, name: 'us_age' })
  age: string;

  @Column({ length: 200, name: 'us_interest' })
  interest: string;

  @Column({ name: 'us_diary_pu_yn' })
  diary_pu_yn: boolean;

  @OneToMany(() => Diary, (diary) => diary.user)
  diary: Diary[];

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
