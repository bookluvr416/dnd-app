import { gql } from '@apollo/client';

/**
 * createCharacter
 * graphql mutation to create a new character
 */
export const createCharacter = gql(`
  mutation createCharacter($input: CreateCharacterInput!) {
    character: createCharacter(input: $input) {
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

export const deleteCharacter = gql(`
  mutation deleteCharacter($id: Int!) {
    deleteCharacter(id: $id)
  }
`)
