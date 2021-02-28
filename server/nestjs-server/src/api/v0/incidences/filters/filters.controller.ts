import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { FiltersService } from './filters.service';

@Controller()
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('class-age')
  getClassAges() {
    return this.filtersService.getClassAges();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':reg')
  getDataByRegion(@Param() codeReg) {
    return this.filtersService.getDataByRegion(codeReg);
  }
}
