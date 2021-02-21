import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncidenceDocument } from '../incidence.schema';

@Injectable()
export class FiltersService {
  constructor(
    @InjectModel('Incidences')
    private readonly incidenceModel: Model<IncidenceDocument>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getClassAges() {
    return this.incidenceModel.find().distinct('cl_age90').exec();
  }
}
