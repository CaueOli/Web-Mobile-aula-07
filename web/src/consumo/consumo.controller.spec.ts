import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consumo } from './entities/consumo.entity';
import { ConsumoService } from './consumo.service';

describe('ConsumoService', () => {
  let service: ConsumoService;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumoService,
        {
          provide: getRepositoryToken(Consumo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ConsumoService>(ConsumoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});