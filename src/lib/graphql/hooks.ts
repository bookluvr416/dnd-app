'use client'

import { gql } from '@apollo/client';
import { useSuspenseQuery, useMutation, useQuery } from '@apollo/client';
import { getReferenceValues, getCharacters } from '@/lib/graphql/queries';
import { createCharacter } from '@/lib/graphql/mutations';
import { CreateCharacterInput } from '@/generated/graphql/graphql';

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
 * useCharacters
 * uses a graphql query to get characters array
 * @returns object with characters array and error object, as well as error and refetch
 */
export function useCharacters() {
  const { data, error, refetch } = useSuspenseQuery(getCharacters, { errorPolicy: 'all' });

  if (error) {
    console.log(error);
  }

  return { characters: data?.characters, error, refetch };
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
            characters(existingCharacters = []) {
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
              return [...existingCharacters, newCharacterRef];
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
