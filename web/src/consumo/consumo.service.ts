import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Consumo } from './entities/consumo.entity';
import { CreateConsumoDto } from './dto/create-consumo.dto';

@Injectable()
export class ConsumoService {
  constructor(
    @InjectRepository(Consumo)
    private consumoRepository: Repository<Consumo>,
  ) {}

  async create(createConsumoDto: CreateConsumoDto): Promise<Consumo> {
    const consumo = this.consumoRepository.create(createConsumoDto);
    return this.consumoRepository.save(consumo);
  }

  async findByUserAndPeriod(usuarioId: string, dataInicio: Date, dataFim: Date): Promise<Consumo[]> {
    return this.consumoRepository.find({
      where: {
        usuarioId,
        dataLeitura: Between(dataInicio, dataFim),
      },
      order: {
        dataLeitura: 'ASC',
      },
    });
  }

  async checkConsumoAlert(usuarioId: string): Promise<{ alerta: boolean; mensagem?: string }> {
    const consumos = await this.consumoRepository.find({
      where: { usuarioId },
      order: { dataLeitura: 'DESC' },
      take: 2,
    });

    if (consumos.length < 2) {
      return { alerta: false };
    }

    const [mesAtual, mesAnterior] = consumos;
    const percentualAumento = ((mesAtual.consumo - mesAnterior.consumo) / mesAnterior.consumo) * 100;

    if (percentualAumento > 10) {
      return {
        alerta: true,
        mensagem: `Seu consumo aumentou ${percentualAumento.toFixed(2)}% em relação ao mês anterior.`,
      };
    }

    return { alerta: false };
  }
}