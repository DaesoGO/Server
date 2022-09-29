import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Board } from './Board.entity';

@Entity()
export class Exercise {
  @PrimaryColumn({ name: 'ex_title' })
  title: string;

  @Column({ name: 'ex_muscle' })
  muscle: string;

  @Column({ name: 'ex_difficulty' })
  difficulty: number;

  @Column({ length: 1024, name: 'ex_explanation' })
  explanation: string;

  @Column({ name: 'ex_precautions' })
  precautions: string;

  @Column({ length: 1024, name: 'ex_videoFile' })
  videoFile: string;

  @OneToMany(() => Board, (board) => board.exercise)
  boards: Board[];
}
