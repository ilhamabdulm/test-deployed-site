import { Card } from 'flowbite-react';
import {
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { GraphStatisticsCardProps, IYearRange } from './types';
import { useState } from 'react';
import YearRange from '../YearRange';

export function GraphStatisticsCard(props: GraphStatisticsCardProps) {
  const {
    graphStats,
    selectedYear,
    onSelectedYearChange,
    onSelectedNumberOfYearsChange,
  } = props;
  const [, setYearRange] = useState<IYearRange>();
  return (
    <Card className="grid grid-cols-1 mb-5 sm:mb-5 p-5">
      <div className="mb-5 grid grid-cols-1  lg:grid-cols-2 justify-center items-center">
        <div className="text-center mb-3">Choose the Year Range: </div>
        <div className="text-center">
          <YearRange
            onSelect={(startYear: number, endYear: number) => {
              setYearRange({ startYear, endYear });
              getYears(startYear, endYear);
            }}
            startYear={selectedYear}
            endYear={selectedYear + 5}
          />
        </div>
      </div>

      {graphStats.length ? (
        <div className="w-100 h-[50vh] lg:h-[70vh] flex justify-center items-center">
          <ResponsiveContainer>
            <BarChart
              data={[...graphStats.filter((stat) => stat._id)]}
              margin={{
                top: 5,
                right: 10,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="color1"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  spreadMethod="reflect"
                >
                  <stop offset="0" stopColor="#82ca9d" />
                  <stop offset="1" stopColor="#059669" />
                </linearGradient>
                <linearGradient
                  id="color2"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  spreadMethod="reflect"
                >
                  <stop offset="0" stopColor="#27272a" />
                  <stop offset="1" stopColor="#6b7280" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis yAxisId="left" orientation="left" stroke="#15803d" />
              <YAxis yAxisId="right" orientation="right" stroke="#18181b" />
              <Tooltip />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="trees_planted"
                fill="url(#color1)"
                barSize={50}
              />
              <Bar
                yAxisId="right"
                dataKey="projected_carbon_offset"
                fill="url(#color2)"
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center">No Data Found</div>
      )}
    </Card>
  );
  function getYears(startYear: number, endYear: number) {
    onSelectedYearChange(startYear);
    const totalYears = Number(endYear) - Number(startYear) + 1;
    onSelectedNumberOfYearsChange(totalYears);
  }
}
