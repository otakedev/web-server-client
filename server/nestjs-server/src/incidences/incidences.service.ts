import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IncidenceDocument } from './incidence.schema';
import { IncidenceInput } from './dto/incidence-input.model';
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class IncidencesService {
  constructor(
    @InjectModel('Incidences')
    private readonly incidenceModel: Model<IncidenceDocument>
  ) {}

  findAll(): Promise<IncidenceDocument[]> {
    return this.incidenceModel.find().exec();
  }

  findOne(id: Number): Promise<IncidenceDocument> {
    return this.incidenceModel.findOne({id: id}).exec();
  }

  async remove(id: Number): Promise<void> {
    await this.incidenceModel.findByIdAndDelete(id).exec();
  }

  async addMany(incidences) {
    return this.incidenceModel.insertMany(incidences);
  }

  csvToJSON(csv, separator){
    var lines=csv.split("\n");
    var result = [];
    var headers=lines[0].split(separator);
    for(var i=1;i<lines.length;i++){
      var obj = {};
      var currentline=lines[i].split(separator);
      for(var j=0;j<headers.length;j++){
        if (!currentline[j]) break;
        obj[headers[j]] = currentline[j];
      }
      if(Object.keys(obj).length > 1){
        result.push(obj);
      }
    }
    return result;
	}
}
