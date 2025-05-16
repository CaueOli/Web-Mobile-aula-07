import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumoModule } from './consumo/consumo.module';
import { Consumo } from './consumo/entities/consumo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'energy.db',
      entities: [Consumo],
      synchronize: true, 
      logging: true,
    }),
    ConsumoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}