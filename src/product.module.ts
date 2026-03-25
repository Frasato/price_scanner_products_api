import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './models/produto.entity';
import { Embalagem } from './models/embalagem.entity';
import { ItemCadernoOferta } from './models/item-caderno-oferta.entity';
import { PrecosController } from './controllers/products.controller';
import { PrecosService } from './services/products.service';
import { CadernoOferta } from './models/cadernooferta.entity';
import { UnidadeNegocio } from './models/unidadenegocio.entity';
import { UnidadeNegocioParticipanteCadernoOferta } from './models/unidadenegocioparticipantecaderno.entity';
import { EmbalagemRepository } from './repositories/embalagem.repository';
import { ItemOfertRepository } from './repositories/itemOferta.repository';
import { UnidadeNegocioRepository } from './repositories/unidadeNegocio.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Embalagem, ItemCadernoOferta, CadernoOferta, UnidadeNegocio, UnidadeNegocioParticipanteCadernoOferta])],
  controllers: [PrecosController],
  providers: [
    PrecosService,
    EmbalagemRepository,
    ItemOfertRepository,
    UnidadeNegocioRepository
  ],
})
export class PrecosModule {}