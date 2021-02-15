import { Controller, Get } from '@nestjs/common';
import { CaseConfirmService } from './case-confirm.service';

@Controller('case-confirm')
export class CaseConfirmController {
  constructor(private readonly caseConfirmService: CaseConfirmService) {}
  @Get()
  getCaseConfirm() {
    return this.caseConfirmService.getCaseConfirmFromApi();
  }
}
