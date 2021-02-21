import { Module } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IncidenceSchema } from '../incidence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Incidences', schema: IncidenceSchema },
    ]),
  ],
  providers: [FiltersService],
  controllers: [FiltersController],
})
export class FiltersModule {}
