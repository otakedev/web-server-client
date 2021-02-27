import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule, Routes } from 'nest-router';
import { CaseConfirmModule } from './api/v0/case-confirm/case-confirm.module';
import { ContactModule } from './api/v0/contact/contact.module';
import { FiltersModule } from './api/v0/incidences/filters/filters.module';
import { IncidencesModule } from './api/v0/incidences/incidences.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { env } from './environments/environments';

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
  {
    path: '/case-confirm',
    module: CaseConfirmModule,
  },
  {
    path: '/contact',
    module: ContactModule,
  },
];

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `${env.mongodb.url}/${env.mongodb.databaseName}`,
      }),
    }),
    RouterModule.forRoutes(routes),
    IncidencesModule,
    CaseConfirmModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
