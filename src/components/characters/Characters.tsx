'use client'

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Character, QueryCharactersInput } from '@/generated/graphql/graphql';
import CharacterFilters from './CharacterFilters';
import { useCharacters } from '@/lib/graphql/hooks';
import ErrorLoading from '../shared/ErrorLoading';
import { PAGE_SIZE } from '@/constants';
import ResultsPerPage from '../shared/ResultsPerPage';
import CharacterList from './CharacterList';

const Characters = () => {
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
      <CharacterFilters
        onFilterChange={handleFilterChange}
      />
      <div className='mt-6 flex justify-between'>
        <Link
          href="/characters/create"
          className="rounded-lg p-4 mb-7 bg-violet-900/90 hover:ring-2 hover:ring-violet-700"
        >
          Create Character
        </Link>
        <ResultsPerPage onNumberChange={handleResultsPerPageChange} />
      </div>
      <CharacterList
        data={data}
        sortedCharacters={sortedCharacters}
        handlePageChange={handlePageChange}
      />
      
    </>
  );
}

export default Characters;
