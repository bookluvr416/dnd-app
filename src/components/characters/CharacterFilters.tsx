'use client'

import { Character } from '@/generated/graphql';
import { useState, useMemo, useEffect } from 'react';

interface Props {
  characters: Character[],
  onFilterChange: (filteredCharacters: Character[]) => void,
}

const CharacterFilters: React.FC<Props> = ({ characters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    race: '',
    alignment: '',
    class: ''
  });

  /**
   * uniqueValues
   * An object of class, alignment, and race keys with unique values from all characters for each key
   */
  const uniqueValues = useMemo(() => ({
    race: [...new Set(characters.map(char => char.race?.raceType).sort())],
    alignment: [...new Set(characters.map(char => char.alignment?.alignment).sort())],
    class: [...new Set(characters.map(char => char.class?.className).sort())]
  }), [characters]);

  /**
   * useEffect
   * On search term or filter change, filter characters and call params function
   */
  useEffect(() => {
    const filtered = characters.filter(character => {
      const name = character.name ?? '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRace = !filters.race || character.race?.raceType === filters.race
      const matchesAlignment = !filters.alignment || character.alignment?.alignment === filters.alignment
      const matchesClass = !filters.class || character.class?.className === filters.class

      return matchesSearch && matchesRace && matchesClass && matchesAlignment;
    });

    onFilterChange(filtered);
  }, [searchTerm, filters])

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

  const commonClasses = 'bg-purple-950/60 border border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-white px-4 py-2';

  return (
    <div className="space-y-4 bg-indigo-950 ring-2 ring-blue-700/50 p-4 rounded-lg">
      {/* Search Input */}
      <div>
        <div className='pb-2'>
          <label
              htmlFor='name-search'
              id='name-search'
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
          className={`w-full placeholder-gray-400 ${commonClasses}`}
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {Object.entries(filters).map(([key]) => {
          const typedKey = key as keyof typeof uniqueValues | keyof typeof filters;
          const filterValues = uniqueValues[typedKey]
                                .filter((value) => value !== undefined && value !== null)
                                .map((value: string) => value);
          let text: string = '';

          if (key === 'race') {
            text = 'Races';
          } else if (key === 'alignment') {
            text = 'Alignments';
          } else if (key === 'class') {
            text = 'Classes';
          }

          return (
            <div key={key}>
              <div className='pb-2'>
                <label
                    htmlFor={`${key}-filter`}
                    id={`${key}-filter`}
                    aria-label={`Filter by ${key}`}
                    className="pr-4"
                  >
                    Filter by {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
              </div>
              <select
                id={`${key}-filter`}
                value={filters[typedKey]}
                onChange={(e) => {
                  handleFilterChange(key, e.target.value);
                }}
                className={`${commonClasses}`}
              >
                <option value="">All {text}</option>
                {filterValues.map((value: string) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CharacterFilters;
