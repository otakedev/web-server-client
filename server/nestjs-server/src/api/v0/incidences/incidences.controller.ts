/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IncidenceInput, IncidenceRegionModel } from './dto/incidence-input.model';
import { IncidencesService } from './incidences.service';

@Controller()
export class IncidencesController {
  constructor(private readonly incidencesService: IncidencesService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getIncidences(@Query() query) {
    return await this.incidencesService.findIncidenceRateFilters(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/regions')
  async getIncidencesByRegion(): Promise<IncidenceRegionModel> {
    const incidences = await this.incidencesService.findAllByRegion(1);
    if(incidences.length <=0){
      throw new HttpException('Data not found', HttpStatus.BAD_REQUEST);
    }
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
