/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { IncidencesService } from './incidences.service';
import { IncidencesController } from './incidences.controller';
import { IncidenceSchema } from './incidence.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FiltersModule } from './filters/filters.module';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Incidences', schema: IncidenceSchema },
    ]),
    FiltersModule,
  ],
  providers: [IncidencesService, JwtStrategy],
  controllers: [IncidencesController],
})
export class IncidencesModule { }
