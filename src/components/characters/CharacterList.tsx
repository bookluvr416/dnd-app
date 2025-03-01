'use client'

import { useEffect, useState } from 'react';
import { Character } from '@/generated/graphql/graphql';
import CharacterCard from './CharacterCard';
import CharacterFilters from './CharacterFilters';
import { useCharacters } from '@/lib/graphql/hooks';

const CharacterList = () => {
  const { characters, error } = useCharacters();

  const [filteredResults, setFilteredResults] = useState<Character[]>([]);

  /**
   * useEffect
   * sorts characters by name A-Z when characters array changes
   */
  useEffect(() => {
    const sorted = [...characters].sort((a, b) => {
      if (a.name! < b.name!) return -1;
      if (a.name! > b.name!) return 1;
      return 0;
    });

    setFilteredResults(sorted);
  }, [characters]);

  /**
   * handleFilterChange
   * sets state for filtered characters
   * @param filteredCharacters array of characters
   */
  const handleFilterChange = (filteredCharacters: Character[]) => {
    setFilteredResults(filteredCharacters);
  }

  if (error) {
    return (
      <>
        <div className="text-lg pb-3">Error!</div>
        <div>Unable to load characters. Please try again.</div>
      </>
    )
  }

  return (
    <>
      <div>
        <CharacterFilters 
          characters={characters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-7">
        {filteredResults.map(character => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </div>
    </>
  );
}

export default CharacterList;
