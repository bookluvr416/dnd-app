'use client'

import { useSuspenseQuery } from '@apollo/client';
import { getReferenceValues, getCharacters } from '@/lib/graphql/queries';

/**
 * useReferenceValues
 * uses a graphql query to get all reference values (skills, abilities, races, classes, alignments)
 * @returns object with arrays of reference values
 */
export function useReferenceValues() {
  const { data, error } = useSuspenseQuery(getReferenceValues);

  if (error) {
    console.log(error);
  }

  return {
    abilities: data.referenceValues.abilities,
    skills: data.referenceValues.skills,
    alignments: data.referenceValues.alignments,
    classes: data.referenceValues.classes,
    races: data.referenceValues.races,
    error
  };
}

/**
 * useCharacters
 * uses a graphql query to get characters array
 * @returns object with characters array and error object
 */
export function useCharacters() {
  const { data, error } = useSuspenseQuery(getCharacters);

  if (error) {
    console.log(error);
  }

  return { characters: data.characters, error };
}
