const typeDefs = `#graphql
  type Character {
    id: Int!
    name: String
    level: Int
    race: Race
    class: Class
    armorClass: Int
    speed: Int
    hp: Int
    initiative: Int
    proficiencyBonus: Int
    alignment: Alignment
    abilities: [CharacterAbility]
    skills: [CharacterSkill]
  }

  type Skill {
    id: Int
    skill: String
  }

  type Race {
    id: Int
    raceName: String
    raceType: String
  }

  type Class {
    id: Int
    className: String
  }

  type Alignment {
    id: Int
    alignment: String
  }

  type Ability {
    id: Int
    ability: String
  }

  type CharacterAbility {
    id: Int
    characterId: Int
    ability: Ability
    abilityScore: Int
    proficiencyBonus: Int
  }

  type CharacterSkill {
    id: Int
    characterId: Int
    skill: Skill
    skillProficiency: Int
  }

  input NewCharacterSkillInput {
    skillId: Int!
    skillProficiency: Int!
  }

  input NewCharacterAbilityInput {
    abilityId: Int!
    abilityScore: Int!
    proficiencyBonus: Int!
  }

  input NewCharacterInput {
    name: String!,
    level: Int!,
    raceId: Int!,
    classId: Int!,
    armorClass: Int!,
    speed: Int!,
    hp: Int!,
    initiative: Int!,
    proficiencyBonus: Int!,
    alignmentId: Int!,
  }

  input CreateCharacterInput {
    character: NewCharacterInput!,
    skills: [NewCharacterSkillInput]!,
    abilities: [NewCharacterAbilityInput]!,
  }

  input UpdateCharacterSkillInput {
    id: Int!
    skillProficiency: Int!
  }

  input UpdateCharacterAbilityInput {
    id: Int!
    abilityScore: Int!
    proficiencyBonus: Int!
  }

  input UpdateCharacterInput {
    id: Int!,
    name: String,
    level: Int,
    raceId: Int,
    classId: Int,
    armorClass: Int,
    speed: Int,
    hp: Int,
    initiative: Int,
    proficiencyBonus: Int,
    alignmentId: Int,
    skills: [UpdateCharacterSkillInput],
    abilities: [UpdateCharacterAbilityInput],
  }

  type Query {
    characters: [Character!]!
    character(id: Int!): Character

    skills: [Skill!]!
    skill(id: Int!): Skill

    races: [Race!]!
    race(id: Int!): Race

    classes: [Class!]!
    class(id: Int!): Class

    alignments: [Alignment!]!
    alignment(id: Int!): Alignment

    abilities: [Ability!]!
    ability(id: Int!): Ability
  }

  type Mutation {
    createCharacter(input: CreateCharacterInput!): Character
    updateCharacter(input: UpdateCharacterInput!): Character
    deleteCharacter(id: Int!): Boolean
  }
`;

export default typeDefs;
