import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IncidencesService } from './incidences.service';

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
    const incidences = this.incidencesService.csvToJSON(file.buffer.toString(), ";");
    await this.incidencesService.addMany(incidences);
	}
}
