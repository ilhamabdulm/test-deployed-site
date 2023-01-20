import { useState } from 'react';
import { AxiosError } from 'axios';
import { useLoaderData } from 'react-router-dom';

import { ErrorResponse } from '../../../types/response';
import { userStore } from '../../shared/store/userStore';
import { api, getHeaders } from '../../shared/utils/API';
import { APIEndpoints } from '../../../constants/endpoints';
import { ReactRouterActionResponse } from '../../../types/libs';

import { StatisticsCards } from '../components/StatisticsCards';
import { TransactionDetails } from '../components/TransactionDetails';
import { GraphStatisticsCard } from '../components/GraphStatisticsCard';
import { HeaderNavigationMenu } from '../components/HeaderNavigationMenu';
import { SidebarNavigationMenu } from '../components/SidebarNavigationMenu';
import { useGetGraphStatistics } from '../queries/useGetGraphStatistics';

export async function dashboardPageLoader() {
  const loaderResponse = {
    data: { statisticsData: null, orders: [], graphStatistics: null },
  };
  try {
    const getStatisticsResponse = await api.get(APIEndpoints.GET_STATISTICS, {
      headers: getHeaders(),
    });

    const getOrdersResponse = await api.get(APIEndpoints.GET_ORDERS, {
      headers: getHeaders(),
      params: {
        status: 'all',
      },
    });

    const getGraphStatisticsResponse = await api.get(
      APIEndpoints.GET_GRAPH_STATISTICS,
      {
        headers: getHeaders(),
        params: {
          numYears: 5,
          startYear: 2023,
        },
      },
    );

    if (getStatisticsResponse.status === 200) {
      loaderResponse.data.statisticsData = getStatisticsResponse.data;
    }

    if (getOrdersResponse.status === 200) {
      loaderResponse.data.orders = getOrdersResponse.data;
    }

    if (getGraphStatisticsResponse.status === 200) {
      loaderResponse.data.graphStatistics = getGraphStatisticsResponse.data;
    }

    return loaderResponse;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return { error: axiosError.response?.data.message, data: null };
  }
}
export function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedNumberOfYears, setSelectedNumberOfYears] = useState(5);
  const [isToggle, setToggle] = useState(false);
  const changeToggle = (value: boolean) => {
    setToggle(value);
  };
  const user = userStore.getState().user;
  const response = useLoaderData() as ReactRouterActionResponse<
    typeof dashboardPageLoader
  >;

  const { data: graphStats } = useGetGraphStatistics(
    selectedNumberOfYears,
    selectedYear,
    response?.data?.graphStatistics || [],
  );
  return (
    <section className="container mx-auto  md:container flex flex-row p-3">
      <SidebarNavigationMenu isToggle={isToggle} />
      <section className="flex-1 md:ml-64">
        <HeaderNavigationMenu user={user} changeToggle={changeToggle} />
        <div className="grid grid-cols-1 p-4">
          <div className="flex justify-between px-4 py-2 mb-3 border-b-1 font-bold uppercase">
            STATISTICS
          </div>
          {<StatisticsCards statistics={response?.data?.statisticsData} />}
        </div>
        <div className="grid grid-cols-1 p-4">
          <div className="flex justify-between px-4 py-2 mb-3 border-b-1 font-bold uppercase">
            <span>Transaction Details</span>
          </div>
          {<TransactionDetails orders={response?.data?.orders || []} />}
        </div>
        <div className="grid grid-cols-1 p-4">
          <div className="px-4 py-2 mb-3 border-b-1 font-bold uppercase">
            <span>Graph Statistics</span>
          </div>
          <GraphStatisticsCard
            graphStats={graphStats}
            selectedYear={selectedYear}
            onSelectedYearChange={setSelectedYear}
            selectedNumberOfYears={selectedNumberOfYears}
            onSelectedNumberOfYearsChange={setSelectedNumberOfYears}
          />
        </div>
      </section>
    </section>
  );
}
