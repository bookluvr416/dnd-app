import { gql } from '@apollo/client';

/**
 * createCharacter
 * graphql mutation to create a new character
 */
export const createCharacter = gql(`
  mutation createCharacter($input: CreateCharacterInput!) {
    createCharacter(input: $input) {
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
  }
`);
