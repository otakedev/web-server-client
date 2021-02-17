/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IncidenceInput, IncidenceRegionModel } from './dto/incidence-input.model';
import { IncidencesService } from './incidences.service';

@Controller('incidences')
export class IncidencesController {
  constructor(private readonly incidencesService: IncidencesService) { }

  @Get()
  async getIncidences() {
    return await this.incidencesService.findAll();
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
