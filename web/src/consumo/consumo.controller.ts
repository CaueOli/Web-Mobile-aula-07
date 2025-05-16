import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConsumoService } from './consumo.service';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Controller('consumo')
export class ConsumoController {
  constructor(private readonly consumoService: ConsumoService) {}

  @Post()
  create(@Body() createConsumoDto: CreateConsumoDto) {
    return this.consumoService.create(createConsumoDto);
  }

  @Get('historico')
  getHistory(
    @Query('usuarioId') usuarioId: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    return this.consumoService.findByUserAndPeriod(
      usuarioId,
      new Date(dataInicio),
      new Date(dataFim),
    );
  }

  @Get('alerta')
  checkAlert(@Query('usuarioId') usuarioId: string) {
    return this.consumoService.checkConsumoAlert(usuarioId);
  }
}