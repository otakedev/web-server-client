import { Controller, Get } from '@nestjs/common';
import { FiltersService } from './filters.service';

@Controller()
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  getHello(): string {
    return this.filtersService.getHello();
  }
}
