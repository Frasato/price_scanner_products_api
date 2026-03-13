import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cadernooferta')
export class CadernoOferta {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number = 0;

  @Column({ type: 'character', length: 1 })
  status: string = "";
}