export class IncidenceInput {
  reg: string;
  jour: Date;
  P_f: number;
  P_h: number;
  P: number;
  pop_h: number;
  pop_f: number;
  pop: number;
  cl_age90: number;
  tx_std?: number;
}

export class IncidenceRegionsInput {
  lastUpdateDate: Date;
  lastUpdateId: number;
  data: [IncidenceRegionModel];
}

export interface IncidenceRegionModel {
  count: number;
  date: Date;
  regions: [
    {
      reg: string;
      tx_std: number;
      count: number;
    },
  ];
}
