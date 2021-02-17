/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncidenceRegionModel } from './dto/incidence-input.model';
import { IncidenceDocument } from './incidence.schema';

@Injectable()
export class IncidencesService {
  constructor(
    @InjectModel('Incidences')
    private readonly incidenceModel: Model<IncidenceDocument>,
  ) { }

  findAll(): Promise<IncidenceDocument[]> {
    return this.incidenceModel.find().exec();
  }

  findAllByRegion(limit = 1): Promise<IncidenceRegionModel[]> {
    return this.incidenceModel.aggregate([
      {
        '$group': {
          '_id': {
            'jour': '$jour',
            'reg': '$reg'
          },
          'tx_std': {
            '$sum': '$tx_std'
          },
          'dateCount': {
            '$sum': 1
          }
        }
      }, {
        '$group': {
          '_id': '$_id.jour',
          'regions': {
            '$push': {
              'reg': '$_id.reg',
              'tx_std': '$tx_std',
              'count': '$dateCount'
            }
          },
          'count': {
            '$sum': '$dateCount'
          }
        }
      }, {
        '$sort': {
          '_id': -1
        }
      }, {
        '$limit': limit
      }, {
        '$project': {
          '_id': 0,
          'date': '$_id',
          'regions': '$regions',
          'count': '$count'
        }
      }
    ]).exec();
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
