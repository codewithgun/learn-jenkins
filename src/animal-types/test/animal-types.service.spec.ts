import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTypesService } from './animal-types.service';

describe('AnimalTypesService', () => {
  let service: AnimalTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalTypesService],
    }).compile();

    service = module.get<AnimalTypesService>(AnimalTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
