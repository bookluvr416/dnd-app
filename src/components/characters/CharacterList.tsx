'use client'

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Character, QueryCharactersInput } from '@/generated/graphql/graphql';
import CharacterCard from './CharacterCard';
import CharacterFilters from './CharacterFilters';
import { useCharacters } from '@/lib/graphql/hooks';
import ErrorLoading from '../shared/ErrorLoading';
import Paginator from '../shared/Paginator';
import { PAGE_SIZE } from '@/constants';
import ResultsPerPage from '../shared/ResultsPerPage';

const CharacterList = () => {
  const pathname = usePathname()

  const { data, error, refetch, fetchMore } = useCharacters();

  const [sortedCharacters, setSortedCharacters] = useState<Character[]>([]);
  const [resultsPerPage, setResultsPerPage] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState({
    class: 0,
    race: 0,
    alignment: 0,
    searchTerm: '',
  });

  useEffect(() => {
    // This runs whenever the pathname changes
    if (pathname === '/characters') {
      const input: QueryCharactersInput = {
        page: 1,
        pageSize: PAGE_SIZE
      };
      refetch({ input });
    }
  }, [pathname])

  const characters = data?.characters.characters;

  /**
   * useEffect
   * sorts characters by name A-Z when characters array changes
   */
  useEffect(() => {
    if (characters && characters.length > 1) {
      const sorted = [...characters].sort((a, b) => {
        if (a.name!.toLowerCase() < b.name!.toLowerCase()) return -1;
        if (a.name!.toLowerCase() > b.name!.toLowerCase()) return 1;
        return 0;
      });

      setSortedCharacters(sorted);
    }
  }, [characters]);

  /**
   * handlePageChange
   * Builds the input object and uses fetchMore to fetch more results on page change
   * @param pageNumber number
   */
  const handlePageChange = useCallback((pageNumber: number) => {
    const input: QueryCharactersInput = {
      page: pageNumber,
      pageSize: resultsPerPage,
    }

    if (filters.class !== 0) input.class = filters.class;
    if (filters.race !== 0) input.race = filters.race;
    if (filters.alignment !== 0) input.alignment = filters.alignment;
    if (filters.searchTerm.trim() !== '') input.name = filters.searchTerm;

    fetchMore({ variables: { input } })
  }, [resultsPerPage, filters])

  /**
   * useEffect
   * Calls the function to change page to 1 on results per page change
   */
  useEffect(() => {
    handlePageChange(1);
  }, [resultsPerPage, handlePageChange])

  /**
   * handleFilterChange
   * Builds the input object, sets state for filters, and uses refetch to refetch the data on filter change
   * @param classType number
   * @param race number
   * @param alignment number
   * @param searchTerm string
   */
  const handleFilterChange = (classType: number, race: number, alignment: number, searchTerm: string) => {
    const input: QueryCharactersInput = {
      page: 1,
      pageSize: resultsPerPage
    }

    if (classType !== 0) input.class = classType;
    if (race !== 0) input.race = race;
    if (alignment !== 0) input.alignment = alignment;
    if (searchTerm.trim() !== '') input.name = searchTerm;

    setFilters({
      class: classType,
      race: race,
      alignment: alignment,
      searchTerm: searchTerm,
    })

    refetch({ input })
  }

  /**
   * handleResultsPerPageChange
   * Sets state for results per page
   * @param count number
   */
  const handleResultsPerPageChange = (count: number) => {
    setResultsPerPage(count);
  };

  if (error) {
    return <ErrorLoading refetch={refetch} />
  }

  return (
    <>
      <div>
        <CharacterFilters
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className='mt-6 flex justify-end'>
        <ResultsPerPage onNumberChange={handleResultsPerPageChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-7">
        {sortedCharacters.map((character, index) => (
          <CharacterCard
            key={character.id}
            character={character}
            index={index}
          />
        ))}
      </div>
      {data && (
        <div className='mt-10'>
          <Paginator
            totalPages={data.characters.totalPages}
            totalResults={data.characters.totalCount}
            currentPage={data.characters.currentPage}
            pageSize={data.characters.pageSize}
            onPageChange={handlePageChange}
            hasNextPage={data.characters.hasNextPage}
            hasPreviousPage={data.characters.hasPreviousPage}
          />
        </div>
      )}
      
    </>
  );
}

export default CharacterList;
