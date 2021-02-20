import { HttpModule, Module } from '@nestjs/common';
import { CaseConfirmController } from './case-confirm.controller';
import { CaseConfirmService } from './case-confirm.service';

@Module({
  imports: [HttpModule],
  providers: [CaseConfirmService],
  controllers: [CaseConfirmController],
})
export class CaseConfirmModule {}
