import { Module } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';
import { IncidenceSchema } from './incidence.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Incidences', schema: IncidenceSchema}])],
  providers: [IncidencesService],
  controllers: [IncidencesController],
  exports: [IncidencesService]
})
export class IncidencesModule {}
