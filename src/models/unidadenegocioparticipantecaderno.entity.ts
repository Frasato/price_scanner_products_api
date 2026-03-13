import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('unidadenegocioparticipantecadernooferta')
export class UnidadeNegocioParticipanteCadernoOferta {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number = 0;

  @Column({ type: 'bigint' })
  unidadenegocioid: number = 0;

  @Column({ type: 'bigint' })
  cadernoofertaid: number = 0;
}