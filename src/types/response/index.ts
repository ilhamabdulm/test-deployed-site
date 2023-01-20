export type ErrorResponse = {
  code: number;
  message: string;
};

export type StatisticsResponse = {
  carbon_offset: number;
  trees_planted: number;
  distance_accounted_for: number;
  total_calculations: number;
  estimated_ROI: number;
};
