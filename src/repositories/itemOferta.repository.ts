import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CadernoOferta } from "src/models/cadernooferta.entity";
import { ItemCadernoOferta } from "src/models/item-caderno-oferta.entity";
import { UnidadeNegocioParticipanteCadernoOferta } from "src/models/unidadenegocioparticipantecaderno.entity";
import { Repository } from "typeorm";

@Injectable()
export class ItemOfertRepository{
    constructor(
        @InjectRepository(ItemCadernoOferta)
        private repo: Repository<ItemCadernoOferta>
    ){}

    async findItem(unidadeId: number, embalagemId: string){
        return this.repo.createQueryBuilder('i')
              .innerJoin(
                CadernoOferta,
                'c',
                'c.id = i.cadernoofertaid',
              )
              .innerJoin(
                UnidadeNegocioParticipanteCadernoOferta,
                'up',
                'up.cadernoofertaid = c.id AND up.unidadenegocioid = :unidadeId',
                { unidadeId },
              )
              .where('i.embalagemid = :embalagemId', { embalagemId })
              .andWhere('c.status = :status', { status: 'A' })
              .andWhere('c.datahorainicial IS NOT NULL')
              .andWhere('c.datahorafinal IS NULL')
              .select(['i.id', 'i.embalagemid', 'i.precooferta'])
              .orderBy('i.id', 'DESC')
              .getOne();
    }
}