import { graphql } from '@/generated/graphql/gql';

/**
 * characterDetailFragment
 * graphql fragment for queries with common character data
 */
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

/**
 * getCharacters
 * graphql query to get all characters
 */
export const getCharacters = graphql(`
  query GetCharacters {
    characters {
      ...CharacterDetail
    }
  }
`);

/**
 * getCharacterById
 * graphql query to get a single character by id
 */
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

/**
 * getCharacterById
 * graphql query to get partial data for a single character by id
 */
export const getPartialCharacterById = graphql(`
  query getPartialCharacterById($id: Int!) {
    character(id: $id) {
      ...CharacterDetail
    }
  }
`);

/**
 * getRaces
 * graphql query to get races
 */
export const getRaces = graphql(`
  query GetRaces {
    races {
      id
      raceName
      raceType
    }
  }
`);

/**
 * getClasses
 * graphql query to get classes
 */
export const getClasses = graphql(`
  query GetClasses {
    classes {
      id
      className
    }
  }
`);

/**
 * getAlignments
 * graphql query to get alignments
 */
export const getAlignments = graphql(`
  query GetAlignments {
    alignments {
      id
      alignment
    }
  }
`);

/**
 * getSkills
 * graphql query to get skills
 */
export const getSkills = graphql(`
  query GetSkills {
    skills {
      id
      skill
    }
  }
`);

/**
 * getAbilities
 * graphql query to get abilities
 */
export const getAbilities = graphql(`
  query GetAbilities {
    abilities {
      id
      ability
    }
  }
`);

/**
 * getReferenceValues
 * graphql query to get race, skill, ability, class, alignment data
 */
export const getReferenceValues = graphql(`
  query GetreferenceValues {
    referenceValues {
      races {
        id
        raceName
        raceType
      }
      classes {
        id
        className
      }
      abilities {
        id
        ability
      }
      skills {
        id
        skill
      }
      alignments {
        id
        alignment
      }
    }
  }
`);
