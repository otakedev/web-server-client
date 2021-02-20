import { Test, TestingModule } from '@nestjs/testing';
import { CaseConfirmController } from './case-confirm.controller';

describe('CaseConfirmController', () => {
  let controller: CaseConfirmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseConfirmController],
    }).compile();

    controller = module.get<CaseConfirmController>(CaseConfirmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
