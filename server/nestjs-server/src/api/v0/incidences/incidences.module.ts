import { Module } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';
import { IncidenceSchema } from './incidence.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Incidences', schema: IncidenceSchema },
    ]),
    FiltersModule,
  ],
  providers: [IncidencesService],
  controllers: [IncidencesController],
})
export class IncidencesModule {}
