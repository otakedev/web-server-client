import * as mongoose from 'mongoose';

export const IncidenceSchema = new mongoose.Schema({
  reg: { type: String, required: true },
  jour: { type: Date, required: true },
  P_h: { type: Number, required: true },
  P_f: { type: Number, required: true },
  P: { type: Number, required: true },
  pop_h: { type: Number, required: true },
  pop_f: { type: Number, required: true },
  pop: { type: Number, required: true },
  cl_age90: { type: Number, required: true },
  tx_std: { type: Number, required: true },
});

export interface IncidenceDocument extends mongoose.Document {
  region: string;
  day: Date;
  positive_man: number;
  positive_woman: number;
  total_positive: number;
  population_man: number;
  population_woman: number;
  total_population: number;
  age_class: number;
  tx_std: number;
}
