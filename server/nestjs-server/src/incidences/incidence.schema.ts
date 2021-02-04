import * as mongoose from 'mongoose';

export const IncidenceSchema = new mongoose.Schema({
  reg: {type: String, required: true},
  jour: {type: Date, required: true},
  P_h: {type: Number, required: true},
  P_f: {type: Number, required: true},
  P: {type: Number, required: true},
  pop_h: {type: Number, required: true},
  pop_f: {type: Number, required: true},
  pop: {type: Number, required: true},
  cl_age90: {type: Number, required: true}
  
});

export interface IncidenceDocument extends mongoose.Document {
  region: String;
  day: Date;
  positive_man: Number;
  positive_woman: Number;
  total_positive: Number;
  population_man: Number;
  population_woman: Number;
  total_population: Number;
  age_class: Number;
}