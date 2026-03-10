import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Produto } from './produto.entity';

@Entity('embalagem')
export class Embalagem {
  @PrimaryColumn({ type: 'bigint' })
  id: string = "";

  @Column({ type: 'varchar', name: 'codigobarras' })
  codigobarras: string = "";

  @Column({ type: 'numeric', name: 'precovenda', nullable: true })
  precovenda: string | null = "";

  @Column({ type: 'bigint', name: 'produtoid' })
  produtoId: string = "";

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produtoid' })
  produto: Produto | undefined;
}