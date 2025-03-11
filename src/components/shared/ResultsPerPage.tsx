import { PAGE_SIZE } from '@/constants';

const ResultsPerPage: React.FC<{ onNumberChange: (number: number) => void }> = ({ onNumberChange }) => {

  const handleNumberChange = (value: string) => {
    onNumberChange(+value);
  }

  return (
    <div>
      <div className='pb-2 inline-block'>
        <label
            htmlFor="results-per-page-filter-input"
            id="results-per-page-filter"
            aria-label="Results Per Page"
            className="pr-4"
          >
            Results Per Page
          </label>
      </div>
      <select
        id="results-per-page-filter-input"
        defaultValue={PAGE_SIZE.toString()}
        onChange={(e) => {
          handleNumberChange(e.target.value);
        }}
        className="bg-purple-950/60 border border-blue-800 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
      >
          <option key={PAGE_SIZE.toString()} value={PAGE_SIZE.toString()}>{PAGE_SIZE}</option>
          <option key="36" value="36">36</option>
          <option key="60" value="60">60</option>
      </select>
    </div>
  )
};

export default ResultsPerPage;