import { Test, TestingModule } from '@nestjs/testing';
import { CaseConfirmService } from './case-confirm.service';

describe('CaseConfirmService', () => {
  let service: CaseConfirmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CaseConfirmService],
    }).compile();

    service = module.get<CaseConfirmService>(CaseConfirmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
