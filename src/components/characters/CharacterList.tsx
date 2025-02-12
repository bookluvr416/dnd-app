'use client'

import { useState } from "react";
import { Character } from "@/generated/graphql/graphql";
import CharacterCard from "./CharacterCard";
import CharacterFilters from "./CharacterFilters";
import { useSuspenseQuery } from "@apollo/client";
import { getCharacters } from "@/lib/graphql/queries";

function useCharacters() {
  const { data, error } = useSuspenseQuery(getCharacters);

  if (error) {
    console.log(error);
  }

  return { characters: data.characters, error };
}

const CharacterList = () => {
  const { characters, error } = useCharacters();


  if (error) {
    return (
      <>
        <div className="text-lg pb-3">Error!</div>
        <div>Unable to load characters. Please try again.</div>
      </>
    )
  }

  const [filteredResults, setFilteredResults] = useState<Character[]>(characters);

  const handleFilterChange = (filteredCharacters: Character[]) => {
    setFilteredResults(filteredCharacters);
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
