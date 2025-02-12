import { graphql } from '@/generated/graphql/gql';

const characterDetailFragment = graphql(`
  fragment CharacterDetail on Character {
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
`);

export const getCharacters = graphql(`
  query GetCharacters {
    characters {
      ...CharacterDetail
    }
  }
`);

export const getCharacterById = graphql(`
  query GetSingleCharacter($id: Int!) {
    character(id: $id) {
      ...CharacterDetail
      initiative
      proficiencyBonus
      speed
      skills {
        skill {
          id
          skill
        }
        id
        skillProficiency
      }
      abilities {
        id
        abilityScore
        proficiencyBonus
        ability {
          id
          ability
        }
      }
    }
  }
`);
