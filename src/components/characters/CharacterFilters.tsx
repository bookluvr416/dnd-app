'use client'

import { useState, useMemo, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useCharacterFiltersReferenceValues } from '@/lib/graphql/hooks';
import Button from '@/components/shared/Button';

interface Props {
  onFilterChange: (classType: number, race: number, alignment: number, searchTerm: string) => void,
}

const SkeletonComponent = () => (
  <SkeletonTheme baseColor="#211b4b" highlightColor="#310e5a">
    <section>
      <Skeleton count={1} className='h-28 ring-1 ring-blue-700/50' />
    </section>
  </SkeletonTheme>
);

const CharacterFilters: React.FC<Props> = ({ onFilterChange }) => {
  const { races, classes, alignments, error, refetch, loading } = useCharacterFiltersReferenceValues();

  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    class: '',
    race: '',
    alignment: '',
  });

   /**
    * handleFilterChange
    * sets filters state on change
    * @param key 
    * @param value 
    */
   const handleFilterChange = (key: string, value: string) => {
    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [key]: value,
      }
    });
  }

  /**
   * clearFilters
   * clears out filter and search state
   */
  const clearFilters = () => {
    setFilters({
      class: '',
      race: '',
      alignment: '',
    });
    setSearchTerm('');
    onFilterChange(0, 0, 0, '');
  };

  /**
   * onFilter
   * TBD
   */
  const onFilter = () => {
    onFilterChange(+filters.class, +filters.race, +filters.alignment, searchTerm);
  }

  const commonClasses = 'bg-purple-950/60 border border-blue-800 rounded-lg text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700';

  const createFilter = (type: 'class' | 'race' | 'alignment') => {
    let text: string = '';
    let filterValues: { key: string, value: string }[] = [];

    if (type === 'race') {
      text = 'Races';
      filterValues = races ? races.map((race) => ({ key: race.id.toString(), value: race.raceName })) : [];
    } else if (type === 'alignment') {
      text = 'Alignments';
      filterValues = alignments ? alignments.map((alignment) => ({ key: alignment.id.toString(), value: alignment.alignment })) : [];
    } else if (type === 'class') {
      text = 'Classes';
      filterValues = classes ? classes.map((classType) => ({ key: classType.id.toString(), value: classType.className })) : [];
    }

    return (
      <div>
        <div className='pb-2'>
          <label
              htmlFor={`${type}-filter`}
              id={`${type}-filter`}
              aria-label={`Filter by ${text}`}
              className="pr-4"
            >
              Filter by {text}
            </label>
        </div>
        <select
          id={`${type}-filter`}
          value={filters[type]}
          onChange={(e) => {
            handleFilterChange(type, e.target.value);
          }}
          className={`${commonClasses} w-full`}
        >
          <option value="">All {text}</option>
          {filterValues.map((value) => (
            <option key={value.key} value={value.key}>{value.value}</option>
          ))}
        </select>
      </div>
    )
  }

  if (loading) return <SkeletonComponent />

  if (error) {
    return (
      <>
        <div className="space-y-4 bg-indigo-950 ring-2 ring-blue-700/50 p-4 rounded-lg">
          <p>Error! Filters failed to load.</p>
          <Button
            text="Try Again"
            onClick={() =>  {
              refetch()
            }}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="space-y-4 bg-indigo-950 ring-2 ring-blue-700/50 p-4 rounded-lg">
        {/* Search Input */}
        <div>
          <div className='pb-2'>
            <label
                htmlFor='name-search'
                id='name-search-label'
                aria-label='Search by Name'
                className="pr-4"
              >
                Search by Name
              </label>
          </div>
          <input
            type="text"
            id="name-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full ${commonClasses}`}
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {createFilter('class')}
          {createFilter('race')}
          {createFilter('alignment')}
        </div>

        <div className='mt-10'>
          <Button
            text="Filter"
            type="button"
            onClick={onFilter}
            cssMargin='mr-3'
          />
          <Button
            text="Clear Filters"
            type="button"
            disabled={filters.race === '' && filters.alignment === '' && filters.class === '' && searchTerm === '' }
            onClick={clearFilters}
          />
        </div>
      </div>
    </>
  )
}

export default CharacterFilters;
