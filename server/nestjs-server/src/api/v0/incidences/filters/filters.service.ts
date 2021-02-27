import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncidenceDocument } from '../incidence.schema';

@Injectable()
export class FiltersService {
  constructor(
    @InjectModel('Incidences')
    private readonly incidenceModel: Model<IncidenceDocument>,
  ) { }

  async getClassAges() {
    return this.incidenceModel.find().distinct('cl_age90').exec();
  }

  async getDataByRegion(codeReg) {
    return this.incidenceModel.find({ reg: codeReg }).exec();
  }
}
