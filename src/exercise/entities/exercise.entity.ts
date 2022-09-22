import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Board } from './Board.entity';

@Entity()
export class Exercise {
  @PrimaryColumn({ name: 'title' })
  title: string;

  @Column({ name: 'muscle' })
  muscle: string;

  @Column()
  difficulty: number;

  @Column({ name: 'readiness' })
  readiness: number;

  @Column()
  risk: number;

  @Column({ length: 1024 })
  explanation: string;

  @Column({ name: 'precautions' })
  precautions: string;

  @Column({ length: 1024 })
  videoFile: string;

  @OneToMany(() => Board, (board) => board.exercise)
  boards: Board[];
}
