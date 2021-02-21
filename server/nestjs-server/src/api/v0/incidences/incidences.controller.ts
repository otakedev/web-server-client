/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IncidenceInput, IncidenceRegionModel } from './dto/incidence-input.model';
import { IncidencesService } from './incidences.service';

@Controller()
export class IncidencesController {
  constructor(private readonly incidencesService: IncidencesService) { }

  @Get()
  async getIncidences(@Query() query) {
    return await this.incidencesService.findWithFilters(query);
  }

  @Get('/regions')
  async getIncidencesByRegion(): Promise<IncidenceRegionModel> {
    const incidences = await this.incidencesService.findAllByRegion(1);
    return incidences[0];
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const incidences: IncidenceInput[] = this.incidencesService.csvToJSON(
      file.buffer.toString(),
      ';',
    );
    await this.incidencesService.deleteAll();

    incidences.forEach((incidence) => {
      incidence.tx_std = (100000 * incidence.P) / incidence.pop;
    });

    await this.incidencesService.addMany(incidences);
  }
}
