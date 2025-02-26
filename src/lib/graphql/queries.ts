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

export const getRaces = graphql(`
  query GetRaces {
    races {
      id
      raceName
      raceType
    }
  }
`);

export const getClasses = graphql(`
  query GetClasses {
    classes {
      id
      className
    }
  }
`);

export const getAlignments = graphql(`
  query GetAlignments {
    alignments {
      id
      alignment
    }
  }
`);

export const getSkills = graphql(`
  query GetSkills {
    skills {
      id
      skill
    }
  }
`);

export const getAbilities = graphql(`
  query GetAbilities {
    abilities {
      id
      ability
    }
  }
`);

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
