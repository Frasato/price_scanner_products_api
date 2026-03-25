import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UnidadeNegocio } from "src/models/unidadenegocio.entity";
import { Repository } from "typeorm";

@Injectable()
export class UnidadeNegocioRepository{
    constructor(
        @InjectRepository(UnidadeNegocio)
        private repo: Repository<UnidadeNegocio>
    ){}

    async findUnidade(){
        return this.repo
            .createQueryBuilder("u")
            .where("u.codigo = :codigo", {codigo: "01"})
            .select(["u.id"])
            .getOne();
    }
}