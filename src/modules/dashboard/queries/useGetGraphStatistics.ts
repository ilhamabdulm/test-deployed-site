import { useQuery } from '@tanstack/react-query';
import { api, getHeaders } from '../../shared/utils/API';
import { APIEndpoints } from '../../../constants/endpoints';
import { GetGraphStatsResponse } from '../../../types/response/dashboard/getGraphStatsResponse';

export const useGetGraphStatistics = (
  numberOfYears = 5,
  startYear = 2023,
  initialData: GetGraphStatsResponse = [],
) => {
  return useQuery({
    initialData: initialData,
    queryKey: [APIEndpoints.GET_GRAPH_STATISTICS, numberOfYears, startYear],
    queryFn: async () =>
      (
        await api.get<GetGraphStatsResponse>(
          APIEndpoints.GET_GRAPH_STATISTICS,
          {
            headers: getHeaders(),
            params: {
              startYear: startYear,
              numYears: numberOfYears,
            },
          },
        )
      ).data,
  });
};
