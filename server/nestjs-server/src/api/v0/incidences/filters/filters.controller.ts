import { Controller, forwardRef, Get, Inject, Param } from '@nestjs/common';
import { FiltersService } from './filters.service';

@Controller()
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  getHello(): string {
    return this.filtersService.getHello();
  }

  @Get('class-age')
  getClassAges() {
    return this.filtersService.getClassAges();
  }

  @Get(':reg')
  getDataByRegion(@Param() codeReg) {
    return this.filtersService.getDataByRegion(codeReg);
  }
}
