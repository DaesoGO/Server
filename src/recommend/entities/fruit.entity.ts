import { IsEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fruit {
  @PrimaryGeneratedColumn({ name: 'fr_id' })
  id: number;

  @Column({ name: 'fr_name' })
  name: string;

  @Column({ length: 3000, name: 'fr_content' })
  content: string;

  @Column({ length: 500, name: 'fr_img' })
  img: string;
}
