import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Board } from './Board.entity';

@Entity()
export class Exercise {
  @PrimaryColumn()
  exerciseName: string;

  @Column()
  time: number;

  @Column()
  difficulty: number;

  @Column({ length: 1024 })
  explanation: string;

  @Column({ length: 1024 })
  videoFile: string;

  @Column()
  exerciseArea: string;

  @OneToMany(() => Board, (board) => board.exercise)
  Boards: Board[];
}
