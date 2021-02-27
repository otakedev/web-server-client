/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IncidenceInput, IncidenceRegionModel } from './dto/incidence-input.model';
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

  createFilters(query) {
    const filters = {};
    if (!isNaN(parseInt(query.class_age))) {
      filters['cl_age90'] = parseInt(query.class_age);
    } else {
      filters['cl_age90'] = 0;
    }

    if (query.since && query.to) {
      filters['jour'] = {
        $gte: new Date(query.since),
        $lt: new Date(query.to),
      };
    } else if (query.since) {
      filters['jour'] = {
        $gte: new Date(query.since)
      };
    } else if (query.to) {
      filters['jour'] = {
        $lt: new Date(query.to)
      };
    }
    return filters;
  }

  findAllByRegion(limit = 1): Promise<IncidenceRegionModel[]> {
    return this.incidenceModel.aggregate([
      {
        '$match': {
          'cl_age90': 0
        }
      }, {
        '$group': {
          '_id': '$jour',
          'regions': {
            '$push': {
              'reg': '$reg',
              'tx_std': '$tx_std'
            }
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

  async findWithFilters(query): Promise<IncidenceDocument[]> {
    const filters = this.createFilters(query);

    return this.incidenceModel.find(filters).exec();
  }

  async findIncidenceRateFilters(query): Promise<IncidenceDocument[]> {
    const filters = this.createFilters(query);

    const pipeline = [
      {
        '$match': filters
      }, {
        '$group': {
          '_id': {
            'jour': '$jour'
          },
          'tx_std': {
            '$sum': '$tx_std'
          },
          'P_f': {
            '$sum': '$P_f'
          },
          'P_h': {
            '$sum': '$P_h'
          },
          'P': {
            '$sum': '$P'
          },
          'pop_f': {
            '$sum': '$pop_f'
          },
          'pop_h': {
            '$sum': '$pop_f'
          },
          'pop': {
            '$sum': '$pop_f'
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }, {
        '$project': {
          '_id': 0,
          'jour': '$_id.jour',
          'tx_std': '$tx_std',
          'P_f': '$P_f',
          'P_h': '$P_h',
          'P': '$P',
          'pop_f': '$pop_f',
          'pop_h': '$pop_h',
          'pop': '$pop'
        }
      }
    ]

    const data = await this.incidenceModel.aggregate(pipeline).exec();

    data.map(elem => {
      elem.cl_age90 = filters["cl_age90"];
    })

    return data;
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
