import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('produto')
export class Produto {
  @PrimaryColumn({ type: 'bigint' })
  id: string = "";

  @Column({ type: 'varchar', name: 'descricao' })
  descricao: string = "";
}