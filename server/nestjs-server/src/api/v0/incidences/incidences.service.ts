import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IncidenceDocument } from './incidence.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class IncidencesService {
  constructor(
    @InjectModel('Incidences')
    private readonly incidenceModel: Model<IncidenceDocument>,
  ) {}

  findAll(): Promise<IncidenceDocument[]> {
    return this.incidenceModel.find().exec();
  }

  findOne(id: number): Promise<IncidenceDocument> {
    return this.incidenceModel.findOne({ id: id }).exec();
  }

  async remove(id: number): Promise<void> {
    await this.incidenceModel.findByIdAndDelete(id).exec();
  }

  async addMany(incidences) {
    return this.incidenceModel.insertMany(incidences);
  }

  csvToJSON(csv, separator) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(separator);
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(separator);
      for (let j = 0; j < headers.length; j++) {
        if (!currentline[j]) break;
        obj[headers[j]] = currentline[j];
      }
      if (Object.keys(obj).length > 1) {
        result.push(obj);
      }
    }
    return result;
  }

  async deleteAll() {
    return this.incidenceModel.deleteMany({}).exec();
  }
}
