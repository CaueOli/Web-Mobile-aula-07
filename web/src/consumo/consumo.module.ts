import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumo } from './entities/consumo.entity';
import { ConsumoService } from './consumo.service';
import { ConsumoController } from './consumo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Consumo])],
  controllers: [ConsumoController],
  providers: [ConsumoService],
  exports: [ConsumoService],
})
export class ConsumoModule {}