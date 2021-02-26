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
    return this.incidenceModel.find({ cl_age90: 0 }).exec();
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

  findWithFilters(query): Promise<IncidenceDocument[]> {
    const filters = {};
    if (!isNaN(parseInt(query.class_age))) {
      filters['cl_age90'] = query.class_age;
    } else {
      filters['cl_age90'] = 0;
    }

    if (query.since && query.to) {
      filters['jour'] = {
        $gte: query.since,
        $lt: query.to,
      };
    } else if (query.since) {
      filters['jour'] = { $gte: query.since };
    } else if (query.to) {
      filters['jour'] = { $lt: query.to };
    }

    if (query.reg) {
      filters['reg'] = query.reg;
    }

    

    return this.incidenceModel.find(filters).exec();
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
