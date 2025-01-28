const typeDefs = `#graphql
  type Character {
    id: Int!
    name: String!
    level: Int!
    race: String!
    characterClass: String!
  }

  input NewCharacterInput {
    name: String!
    level: Int!
    race: String!
    characterClass: String!
  }

  input UpdateCharacterInput {
    id: Int!
    name: String!
    level: Int!
    race: String!
    characterClass: String!
  }

  type Query {
    characters: [Character!]
  }

  type Mutation {
    createCharacter(input: NewCharacterInput!): Character
    updateCharacter(input: UpdateCharacterInput!): Character
  }
`;

export default typeDefs;
