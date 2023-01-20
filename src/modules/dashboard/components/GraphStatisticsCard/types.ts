import { GetGraphStatsResponse } from '../../../../types/response/dashboard/getGraphStatsResponse';

export type GraphStatisticsCardProps = {
  selectedYear: number;
  selectedNumberOfYears: number;
  onSelectedYearChange: CallableFunction;
  onSelectedNumberOfYearsChange: CallableFunction;
  graphStats: GetGraphStatsResponse;
};

export interface IYearRange {
  startYear: number;
  endYear: number;
}
