import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IncidencesService } from './incidences.service';
import { IncidenceInput } from './dto/incidence-input.model';

@Controller('incidences')
export class IncidencesController {
  constructor(private readonly incidencesService: IncidencesService) {}

  @Get()
  async getIncidences() {
    return await this.incidencesService.findAll();
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
