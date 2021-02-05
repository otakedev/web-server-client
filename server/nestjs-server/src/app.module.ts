import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IncidencesController } from './incidences/incidences.controller';
import { IncidencesModule } from './incidences/incidences.module';
import { IncidencesService } from './incidences/incidences.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), IncidencesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
