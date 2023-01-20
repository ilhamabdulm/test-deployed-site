import { Card } from 'flowbite-react';
import { IconContext } from 'react-icons';
import { GiSmokeBomb } from 'react-icons/gi';
import { TbFileDollar, TbTrees } from 'react-icons/tb';
import type { StatisticsCardsProps } from './type';
import { NumericFormat } from 'react-number-format';
import { getCustomRoundOff, getCustomUnit } from '../../utils/helper';

export function StatisticsCards(props: StatisticsCardsProps) {
  const { statistics } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
      <Card className="mb-5 sm:mb-5">
        <div className="flex justify-between p-0 px-2">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-16 h-16 text-white bg-gradient-to-tl from-gray-500 to-zinc-800 rounded-lg shadow-md shadow-gray-300 relative -top-5 -left-0 ">
            <IconContext.Provider value={{ color: 'white', size: '1.5rem' }}>
              <GiSmokeBomb />
            </IconContext.Provider>
          </div>
          <div>
            <span className="text-sm uppercase tracking-tight text-gray-900 dark:text-white">
              Carbon Offset
            </span>
            <h4 className="text-2xl p-0 m-0 tracking-tight text-gray-900 dark:text-white">
              <NumericFormat
                suffix={getCustomUnit('weight', statistics?.carbon_offset || 0)}
                displayType="text"
                className="font-bold"
                thousandSeparator=","
                value={
                  statistics?.trees_planted
                    ? getCustomRoundOff('weight', statistics?.carbon_offset)
                    : 0
                }
              />
            </h4>
          </div>
        </div>
        <hr />
        <h6>
          <span className="text-xs text-gray-500">
            Estimate provided on GHG standards
          </span>
        </h6>
      </Card>
      <Card className="mb-5 sm:mb-5">
        <div className="flex justify-between p-0 px-2">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-16 h-16 text-white bg-gradient-to-tl from-green-500 to-green-700 rounded-lg shadow-md shadow-gray-300 relative -top-5 -left-0 ">
            <IconContext.Provider value={{ color: 'white', size: '1.5rem' }}>
              <TbTrees />
            </IconContext.Provider>
          </div>
          <div>
            <span className="text-sm  uppercase tracking-tight text-gray-900 dark:text-white">
              Trees Planted
            </span>
            <h4 className="text-2xl p-0 m-0 tracking-tight text-gray-900 dark:text-white">
              <NumericFormat
                displayType="text"
                className="font-bold"
                thousandSeparator=","
                value={
                  statistics?.trees_planted
                    ? (
                        Math.round((statistics?.trees_planted || 0) * 100) / 100
                      ).toFixed(2)
                    : 0
                }
              />
            </h4>
          </div>
        </div>
        <hr />
        <h6>
          <span className="text-xs text-gray-500">
            {statistics?.carbon_offset ? (
              'Great Job!'
            ) : (
              <a href="#" className="!text-blue-500">
                You can get started here
              </a>
            )}
          </span>
        </h6>
      </Card>
      <Card className="mb-5 sm:mb-5">
        <div className="flex justify-between p-0 px-2">
          <div className="inline-flex flex-shrink-0 justify-center items-center w-16 h-16 text-white bg-gradient-to-br from-red-500 to-orange-600 rounded-lg shadow-md shadow-gray-300 relative -top-5 -left-0 ">
            <IconContext.Provider value={{ color: 'white', size: '1.5rem' }}>
              <TbFileDollar />
            </IconContext.Provider>
          </div>
          <div>
            <span className="text-sm  uppercase tracking-tight text-gray-900 dark:text-white">
              Estimated ROI
            </span>
            <h4 className="text-2xl p-0 m-0 tracking-tight text-gray-900 dark:text-white">
              <NumericFormat
                prefix={'$ '}
                displayType="text"
                className="font-bold"
                thousandSeparator=","
                value={
                  statistics?.estimated_ROI
                    ? (
                        Math.round((statistics?.estimated_ROI || 0) * 100) / 100
                      ).toFixed(2)
                    : 0
                }
              />
            </h4>
          </div>
        </div>
        <hr />
        <h6>
          <span className="text-xs text-gray-500">
            Over a 40 year period, subject to change
          </span>
        </h6>
      </Card>
    </div>
  );
}
