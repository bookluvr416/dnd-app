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
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedCharacters, setSortedCharacters] = useState<Character[]>([]);
  const [resultsPerPage, setResultsPerPage] = useState(PAGE_SIZE);
  const [filters, setFilters] = useState({
    class: 0,
    race: 0,
    alignment: 0,
    searchTerm: '',
  });

  const { data, error, refetch, fetchMore } = useCharacters(currentPage);
  const characters = data?.characters.characters;

  useEffect(() => {
    // This runs whenever the pathname changes
    if (pathname === '/characters') {
      const input: QueryCharactersInput = {
        page: 1,
        pageSize: PAGE_SIZE
      };
      refetch({ input });
    }
  }, [pathname]);

  /**
   * useEffect
   * This fetches more characters when currentPage, filters, or resultsPerPage changes
   */
  useEffect(() => {
    const input: QueryCharactersInput = {
      page: currentPage,
      pageSize: resultsPerPage,
    }

    if (filters.class !== 0) input.class = filters.class;
    if (filters.race !== 0) input.race = filters.race;
    if (filters.alignment !== 0) input.alignment = filters.alignment;
    if (filters.searchTerm.trim() !== '') input.name = filters.searchTerm;

    if (currentPage === 1) {
      refetch({ input });
    } else {
      fetchMore({ variables: { input } })
    }
  }, [currentPage, filters, resultsPerPage])

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
    } else if (characters) {
      setSortedCharacters(characters);
    }
  }, [characters]);

  /**
   * handlePageChange
   * Builds the input object and uses fetchMore to fetch more results on page change
   * @param pageNumber number
   */
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, [])

  /**
   * handleFilterChange
   * Builds the input object, sets state for filters, and uses refetch to refetch the data on filter change
   * @param classType number
   * @param race number
   * @param alignment number
   * @param searchTerm string
   */
  const handleFilterChange = (classType: number, race: number, alignment: number, searchTerm: string) => {
    setFilters({
      class: classType,
      race: race,
      alignment: alignment,
      searchTerm: searchTerm,
    });
    setCurrentPage(1);
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
      <div className='mt-6 flex flex-col sm:flex-row justify-between'>
        <Link
          href="/characters/create"
          className="rounded-lg p-4 mb-7 text-center bg-violet-900/90 hover:ring-2 hover:ring-violet-700"
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
