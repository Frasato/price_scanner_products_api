import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Embalagem } from '../models/embalagem.entity';
import { ItemCadernoOferta } from '../models/item-caderno-oferta.entity';
import { CadernoOferta } from '../models/cadernooferta.entity';
import { UnidadeNegocio } from '../models/unidadenegocio.entity';
import { UnidadeNegocioParticipanteCadernoOferta } from '../models/unidadenegocioparticipantecaderno.entity';

function toNumberOrNull(v: string | null | undefined) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

@Injectable()
export class PrecosService {
  constructor(
    @InjectRepository(Embalagem)
    private readonly embalagemRepo: Repository<Embalagem>,

    @InjectRepository(ItemCadernoOferta)
    private readonly itemOfertaRepo: Repository<ItemCadernoOferta>,

    @InjectRepository(UnidadeNegocio)
    private readonly unidadeNegocioRepo: Repository<UnidadeNegocio>,
  ) {}

  async buscarPorCodigoBarras(codigobarras: string) {
    const embalagem = await this.embalagemRepo
      .createQueryBuilder('e')
      .innerJoinAndSelect('e.produto', 'p')
      .where('e.codigobarras = :codigobarras', { codigobarras })
      .select(['e.id', 'e.codigobarras', 'e.precovenda', 'p.id', 'p.descricao'])
      .getOne();

    if (!embalagem) {
      throw new NotFoundException(`Embalagem não encontrada para ${codigobarras}`);
    }

    const unidade = await this.unidadeNegocioRepo.findOne({
      where: { codigo: '01' },
      select: { id: true },
    });

    if (!unidade) {
      throw new NotFoundException(`Unidade de negócio com código 01 não encontrada`);
    }

    const item = await this.itemOfertaRepo
      .createQueryBuilder('i')
      .innerJoin(
        CadernoOferta,
        'c',
        'c.id = i.cadernoofertaid',
      )
      .innerJoin(
        UnidadeNegocioParticipanteCadernoOferta,
        'up',
        'up.cadernoofertaid = c.id AND up.unidadenegocioid = :unidadeId',
        { unidadeId: unidade.id },
      )
      .where('i.embalagemid = :embalagemId', { embalagemId: embalagem.id })
      .andWhere('c.status = :status', { status: 'A' })
      .andWhere('c.datahorainicial IS NOT NULL')
      .andWhere('c.datahorafinal IS NULL')
      .select(['i.id', 'i.embalagemid', 'i.precooferta'])
      .orderBy('i.id', 'DESC')
      .getOne();

    return {
      produto: embalagem.produto?.descricao,
      precovenda: toNumberOrNull(embalagem.precovenda),
      codigobarras: embalagem.codigobarras,
      precooferta: toNumberOrNull(item?.precooferta),
    };
  }
}