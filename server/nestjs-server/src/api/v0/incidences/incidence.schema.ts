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
  reg: string;
  jour: string;
  P_h: number;
  P_f: number,
  P: number,
  pop_h: number,
  pop_f: number,
  pop: number,
  cl_age90: number,
  tx_std: number,
}
