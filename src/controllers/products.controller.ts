import { Controller, Get, Param } from '@nestjs/common';
import { PrecosService } from '../services/products.service';

@Controller('precos')
export class PrecosController {
  constructor(private readonly precosService: PrecosService) {}

  @Get(':codigobarras')
  buscar(@Param('codigobarras') codigobarras: string) {
    return this.precosService.buscarPorCodigoBarras(codigobarras);
  }
}