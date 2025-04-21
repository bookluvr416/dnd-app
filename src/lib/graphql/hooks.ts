'use client'

import { gql } from '@apollo/client';
import { useSuspenseQuery, useMutation, useQuery } from '@apollo/client';
import { getReferenceValues, getCharacters, getCharacterFiltersReferenceValues, getCharacterById } from '@/lib/graphql/queries';
import { createCharacter } from '@/lib/graphql/mutations';
import { CreateCharacterInput, QueryCharactersInput } from '@/generated/graphql/graphql';
import { PAGE_SIZE } from '@/constants';

/**
 * useReferenceValues
 * uses a graphql query to get all reference values (skills, abilities, races, classes, alignments)
 * @returns object with arrays of reference values, as well as error and refetch
 */
export function useReferenceValues() {
  const { data, error, refetch } = useSuspenseQuery(getReferenceValues, { errorPolicy: 'all' });

  if (error) {
    console.log(error);
  }

  return {
    abilities: data?.referenceValues.abilities,
    skills: data?.referenceValues.skills,
    alignments: data?.referenceValues.alignments,
    classes: data?.referenceValues.classes,
    races: data?.referenceValues.races,
    error,
    refetch
  };
}

/**
 * useReferenceValues
 * uses a graphql query to get all reference values (skills, abilities, races, classes, alignments)
 * @returns object with arrays of reference values, as well as error and refetch
 */
export function useCharacterFiltersReferenceValues() {
  const { data, error, refetch, loading } = useQuery(getCharacterFiltersReferenceValues, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    console.log(error);
  }

  return {
    alignments: data?.referenceValues.alignments,
    classes: data?.referenceValues.classes,
    races: data?.referenceValues.races,
    error,
    refetch,
    loading,
  };
}

/**
 * useCharacters
 * uses a graphql query to get characters array
 * @returns object with characters array and error object, as well as error and refetch
 */
export function useCharacters(page: number) {
  const { data, error, refetch, fetchMore } = useSuspenseQuery(getCharacters, {
    errorPolicy: 'all',
    variables: { input: { page: page, pageSize: PAGE_SIZE } }
  });

  if (error) {
    console.log(error);
  }

  return { data, error, refetch, fetchMore };
}

/**
 * useCharacter
 * uses a graphql query to get a single character
 * @param id number
 * @returns object with character data
 */
export function useCharacter(id: number) {
  const { data, error, refetch } = useSuspenseQuery(getCharacterById, {
    variables: { id }
  });

  if (error) {
    console.log(error);
  }

  return { data, error, refetch };
}

/**
 * useCreateCharacter
 * defines the function that will be used to add a new character
 * @returns object with a mutation function, loading, and error
 */
export function useCreateCharacter() {
  const [mutate, { loading, error }] = useMutation(createCharacter);

  const createCharacterMutation = async (input: CreateCharacterInput) => {
    const { data } = await mutate({
      variables: { input },
      update(cache, { data: { character } }) {
        cache.modify({
          fields: {
            characters(existingCharacters) {
              const newCharacterRef = cache.writeFragment({
                data: character,
                fragment: gql`
                  fragment NewCharacter on Character {
                    id
                    name
                    level
                    hp
                    alignment {
                      id
                      alignment
                    }
                    race {
                      id
                      raceName
                      raceType
                    }
                    class {
                      id
                      className
                    }
                  }
                `
              });
              return {
                totalCount: existingCharacters.totalCount + 1,
                characters: [...existingCharacters.characters, newCharacterRef],
                totalPages: Math.ceil((existingCharacters.totalCount + 1) / existingCharacters.pageSize),
                ...existingCharacters,
              };
            }
          }
        });
      }
    });

    return data.character;
  };

  return {
    createCharacterMutation,
    loading,
    error,
  };
}
