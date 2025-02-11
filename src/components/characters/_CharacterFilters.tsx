'use client'

import { Character } from '@/generated/graphql';
import { useState, useMemo } from 'react';
import { debounce } from 'lodash';

const CharacterFilters: React.FC<{ characters: Character[], onFilterChange: (filteredCharacters: Character[]) => void }> = ({ characters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    race: '',
    alignment: '',
    class: ''
  })

  // Get unique values for filter dropdowns
  const uniqueValues = useMemo(() => ({
    races: [...new Set(characters.map(char => char.race?.raceName))],
    alignments: [...new Set(characters.map(char => char.alignment?.alignment))],
    classes: [...new Set(characters.map(char => char.class?.className))]
  }), [characters])

  // Filter characters based on search term and filters
  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      const name = character.name ?? '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRace = !filters.race || character.race === filters.race
      const matchesAlignment = !filters.alignment || character.alignment === filters.alignment
      const matchesClass = !filters.class || character.class === filters.class
      
      return matchesSearch && matchesRace && matchesAlignment && matchesClass
    })
  }, [characters, searchTerm, filters])

  // Update filters and notify parent
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(filteredCharacters)
  }

  return (
    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            onFilterChange(filteredCharacters)
          }}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Race Filter */}
        <select
          value={filters.race}
          onChange={(e) => handleFilterChange('race', e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Races</option>
          {uniqueValues.races.map(race => (
            <option key={race} value={race}>{race}</option>
          ))}
        </select>

        {/* Alignment Filter */}
        <select
          value={filters.alignment}
          onChange={(e) => handleFilterChange('alignment', e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Alignments</option>
          {uniqueValues.alignments.map(alignment => (
            <option key={alignment} value={alignment}>{alignment}</option>
          ))}
        </select>

        {/* Class Filter */}
        <select
          value={filters.class}
          onChange={(e) => handleFilterChange('class', e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Classes</option>
          {uniqueValues.classes.map(charClass => (
            <option key={charClass} value={charClass}>{charClass}</option>
          ))}
        </select>
      </div>

      {/* Results Counter */}
      <div className="text-gray-400 text-sm">
        Showing {filteredCharacters.length} of {characters.length} characters
      </div>
    </div>
  )
};

export default CharacterFilters