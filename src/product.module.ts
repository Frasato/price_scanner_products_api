import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './models/produto.entity';
import { Embalagem } from './models/embalagem.entity';
import { ItemCadernoOferta } from './models/item-caderno-oferta.entity';
import { PrecosController } from './controllers/products.controller';
import { PrecosService } from './services/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Embalagem, ItemCadernoOferta])],
  controllers: [PrecosController],
  providers: [PrecosService],
})
export class PrecosModule {}