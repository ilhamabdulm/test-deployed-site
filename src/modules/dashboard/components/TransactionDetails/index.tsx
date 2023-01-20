import { useMemo, useState } from 'react';
import { IconContext } from 'react-icons';
import { SiShopify } from 'react-icons/si';
import { AiOutlineAmazon, AiOutlineDisconnect } from 'react-icons/ai';
import { Card, Pagination, Select, Table, TextInput } from 'flowbite-react';
import { NumericFormat } from 'react-number-format';
import type { TransactionDetailsProps } from './type';
import { getCustomRoundOff, getCustomUnit } from '../../utils/helper';
import { TbApi } from 'react-icons/tb';
import { TableRow } from 'flowbite-react/lib/esm/components/Table/TableRow';
import { TableCell } from 'flowbite-react/lib/esm/components/Table/TableCell';

const ITEMS_PER_PAGE = 5;

export function TransactionDetails(props: TransactionDetailsProps) {
  const { orders } = props;
  const [page, setPage] = useState(1);
  const [platform, setPlatform] = useState('All');
  const [filterDate, setFilterDate] = useState('01/05/2023');
  const filteredOrders = useMemo(() => {
    if (!orders) {
      return [];
    }
    const currentFilterDate = new Date(filterDate);
    console.log(currentFilterDate);
    let filteredItems =
      platform === 'All'
        ? orders
        : orders.filter((order) => order.source === platform);
    return (filteredItems = filterDate
      ? filteredItems.filter(
          (order) =>
            new Date(order.createdAt).toDateString() ===
            currentFilterDate.toDateString(),
        )
      : filteredItems);
  }, [orders, platform, filterDate]);
  const platforms = useMemo(() => {
    if (orders && orders.length) {
      const platforms = new Set(orders.map((order) => order.source));
      return Array.from(platforms);
    }

    return [];
  }, [orders]);

  const currentPageItems = useMemo(() => {
    if (filteredOrders && filteredOrders.length) {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return filteredOrders.slice(start, end);
    }

    return [];
  }, [filteredOrders, page]);

  return (
    <Card className="mb-5 sm:mb-5 p-5">
      {!orders || orders.length === 0 ? (
        <Table striped hoverable>
          <Table.Head>
            <Table.HeadCell>Carbon Offset</Table.HeadCell>
            <Table.HeadCell>Trees To Offset</Table.HeadCell>
            <Table.HeadCell>Cost To Offset</Table.HeadCell>
            <Table.HeadCell>Distance To Offset</Table.HeadCell>
            <Table.HeadCell>Platform</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No Orders Found
              </TableCell>
            </TableRow>
          </Table.Body>
        </Table>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 justify-center">
            <div
              id="select"
              className="flex items-center justify-center mb-3 lg:mb-0"
            >
              <span>Choose the Platform:</span>
              <Select
                id="years"
                required={true}
                className="ml-3"
                onChange={(e) => {
                  setPlatform(e.target.value);
                  setPage(1);
                }}
              >
                <option value="All">All</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </Select>
            </div>
            <div id="select" className="flex items-center justify-center">
              <span className="mr-5">Choose the Date:</span>
              <TextInput
                id="small"
                type="date"
                sizing="md"
                onChange={(e) => {
                  setFilterDate(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {
            <>
              <Table striped hoverable>
                <Table.Head>
                  <Table.HeadCell>Carbon Offset</Table.HeadCell>
                  <Table.HeadCell>Trees To Offset</Table.HeadCell>
                  <Table.HeadCell>Cost To Offset</Table.HeadCell>
                  <Table.HeadCell>Distance To Offset</Table.HeadCell>
                  <Table.HeadCell>Platform</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {currentPageItems.map((order) => (
                    <Table.Row
                      key={order.id}
                      className="bg-white  dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell>
                        <NumericFormat
                          suffix={getCustomUnit('weight', order.carbonOffset)}
                          displayType="text"
                          thousandSeparator=","
                          value={getCustomRoundOff(
                            'weight',
                            order.carbonOffset,
                          )}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <NumericFormat
                          displayType="text"
                          thousandSeparator=","
                          value={(
                            Math.round((order?.treesToOffset || 0) * 100) / 100
                          ).toFixed(2)}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <NumericFormat
                          displayType="text"
                          thousandSeparator=","
                          prefix={'$ '}
                          value={(
                            Math.round((order?.costToOffset || 0) * 100) / 100
                          ).toFixed(2)}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <NumericFormat
                          suffix={getCustomUnit(
                            'distance',
                            order.distanceOffset,
                          )}
                          displayType="text"
                          thousandSeparator=","
                          value={getCustomRoundOff(
                            'distance',
                            order.distanceOffset,
                          )}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <IconContext.Provider value={{ size: '2rem' }}>
                          {order.source === 'API' && <TbApi />}
                          {order.source === 'Shopify' && <SiShopify />}
                          {order.source === 'Amazon' && <AiOutlineAmazon />}
                          {order.source === null && <AiOutlineDisconnect />}
                        </IconContext.Provider>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              {Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) > 1 && (
                <div className="mt-3 px-3 flex justify-center align-center">
                  <Pagination
                    showIcons
                    currentPage={page}
                    onPageChange={setPage}
                    totalPages={Math.ceil(
                      filteredOrders.length / ITEMS_PER_PAGE,
                    )}
                  />
                </div>
              )}
            </>
          }
        </>
      )}
    </Card>
  );
}
