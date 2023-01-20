import { YearRangeProps } from './types';
const numberOfYears: number[] = [];
function YearRange(props: YearRangeProps) {
  const { startYear, endYear, onSelect } = props;
  for (let i = 0; i <= endYear - startYear; i++) {
    numberOfYears[i] = startYear + i;
  }
  return (
    <div>
      <div className="border-2 inline-block p-3 m-auto rounded-lg text-center">
        <select
          name="yearPicker"
          id="yearPicker1"
          className="appearance-none outline-none !focus:outline-none border-0 !bg-none year  text-center"
          onChange={(e) => {
            onSelect(Number(e.target.value), endYear);
          }}
        >
          <option value="Start Year">Start Year</option>
          {numberOfYears.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <span className="text-right">{'-'}</span>
        <select
          name="yearPicker"
          id="yearPicker2"
          className="!appearance-none outline-none  !focus:outline-none border-0 !bg-none year text-center"
          onChange={(e) => {
            onSelect(startYear, Number(e.target.value));
          }}
        >
          <option value="End Year">End Year</option>
          {numberOfYears.map((value, index) => (
            <option key={startYear + index} value={startYear + index}>
              {startYear + index}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default YearRange;
