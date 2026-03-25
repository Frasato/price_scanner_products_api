import { Injectable, NotFoundException } from '@nestjs/common';
import { EmbalagemRepository } from 'src/repositories/embalagem.repository';
import { UnidadeNegocioRepository } from 'src/repositories/unidadeNegocio.repository';
import { ItemOfertRepository } from 'src/repositories/itemOferta.repository';

function toNumberOrNull(v: string | null | undefined) {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

@Injectable()
export class PrecosService {
  constructor(
    private readonly embalagemRepository: EmbalagemRepository,
    private readonly itemRepository: ItemOfertRepository,
    private readonly unidadeRepository: UnidadeNegocioRepository
  ) {}

  async buscarPorCodigoBarras(codigobarras: string) {
    const embalagem = await this.embalagemRepository.buscarPorCodigo(codigobarras);
    if (!embalagem) throw new NotFoundException(`Embalagem não encontrada para ${codigobarras}`);

    const unidade = await this.unidadeRepository.findUnidade();
    if (!unidade) throw new NotFoundException(`Unidade de negócio com código 01 não encontrada`);

    const item = await this.itemRepository.findItem(unidade.id, embalagem.id);

    return {
      produto: embalagem.produto?.descricao,
      precovenda: toNumberOrNull(embalagem.precovenda),
      codigobarras: embalagem.codigobarras,
      precooferta: toNumberOrNull(item?.precooferta),
    };
  }
}