type GraphStat = {
  _id: number;
  trees_planted: number;
  projected_carbon_offset: number;
};

export type GetGraphStatsResponse = GraphStat[];
