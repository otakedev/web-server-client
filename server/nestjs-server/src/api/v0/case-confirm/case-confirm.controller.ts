import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CaseConfirmService } from './case-confirm.service';

@Controller()
export class CaseConfirmController {
  constructor(private readonly caseConfirmService: CaseConfirmService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCaseConfirm() {
    return this.caseConfirmService.getCaseConfirmFromApi();
  }
}
