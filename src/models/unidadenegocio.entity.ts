import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('unidadenegocio')
export class UnidadeNegocio {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number = 0;

  @Column({ type: 'varchar', length: 5 })
  codigo: string = "";
}