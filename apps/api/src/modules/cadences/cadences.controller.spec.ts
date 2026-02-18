import { Test, TestingModule } from '@nestjs/testing';
import { CadencesController } from './cadences.controller';

describe('CadencesController', () => {
  let controller: CadencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadencesController],
    }).compile();

    controller = module.get<CadencesController>(CadencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
