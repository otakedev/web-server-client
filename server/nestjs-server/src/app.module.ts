import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncidencesModule } from './api/v0/incidences/incidences.module';
import { FiltersModule } from './api/v0/incidences/filters/filters.module';
import { RouterModule, Routes } from 'nest-router';
import { MongooseModule } from '@nestjs/mongoose';

const routes: Routes = [
  {
    path: '/incidences',
    module: IncidencesModule,
    children: [
      {
        path: '/filters',
        module: FiltersModule,
      },
    ],
  },
];

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost/nest',
      }),
    }),
    RouterModule.forRoutes(routes),
    IncidencesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
