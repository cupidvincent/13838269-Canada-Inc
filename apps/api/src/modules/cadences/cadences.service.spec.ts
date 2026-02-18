import { Test, TestingModule } from '@nestjs/testing';
import { CadencesService } from './cadences.service';

describe('CadencesService', () => {
  let service: CadencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CadencesService],
    }).compile();

    service = module.get<CadencesService>(CadencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
