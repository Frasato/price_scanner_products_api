import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Embalagem } from "src/models/embalagem.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmbalagemRepository{
    constructor(
        @InjectRepository(Embalagem)
        private repo: Repository<Embalagem>
    ){}

    async buscarPorCodigo(codigoBarras: string){
        return this.repo
            .createQueryBuilder('e')
            .innerJoinAndSelect('e.produto', 'p')
            .where('e.codigobarras = :codigoBarras', { codigoBarras })
            .select(['e.id', 'e.codigobarras', 'e.precovenda', 'p.id', 'p.descricao'])
            .getOne();
    }
}