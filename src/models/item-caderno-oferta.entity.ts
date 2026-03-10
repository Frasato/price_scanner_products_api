import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Embalagem } from './embalagem.entity';

@Entity('itemcadernooferta')
export class ItemCadernoOferta {
  @PrimaryColumn({ type: 'bigint' })
  id: string = "";

  @Column({ type: 'bigint', name: 'embalagemid' })
  embalagemId: string = "";

  @ManyToOne(() => Embalagem)
  @JoinColumn({ name: 'embalagemid' })
  embalagem: Embalagem | undefined;

  @Column({ type: 'numeric', name: 'precooferta', nullable: true })
  precooferta: string | null = "";
}

export { Embalagem };
