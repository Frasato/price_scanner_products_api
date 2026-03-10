import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Embalagem } from '../models/embalagem.entity';
import { ItemCadernoOferta } from '../models/item-caderno-oferta.entity';

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
  ) {}

  async buscarPorCodigoBarras(codigobarras: string) {
    const embalagem = await this.embalagemRepo
      .createQueryBuilder('e')
      .innerJoinAndSelect('e.produto', 'p')
      .where('e.codigobarras = :codigobarras', { codigobarras })
      .select([
        'e.id',
        'e.codigobarras',
        'e.precovenda',
        'p.id',
        'p.descricao',
      ])
      .getOne();

    if (!embalagem) {
      throw new NotFoundException(`Embalagem não encontrada para ${codigobarras}`);
    }
    const item = await this.itemOfertaRepo.findOne({
      where: { embalagemId: embalagem.id },
      select: { precooferta: true, id: true, embalagemId: true },
      order: { id: 'DESC' },
    });

    return {
      produto: embalagem.produto?.descricao,
      precovenda: toNumberOrNull(embalagem.precovenda),
      codigobarras: embalagem.codigobarras,
      precooferta: toNumberOrNull(item?.precooferta),
    };
  }
}