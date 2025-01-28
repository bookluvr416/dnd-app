const typeDefs = `#graphql
  type Character {
    id: ID!
    name: String!
    level: Int!
    race: String!
    class: String!
  }

  input NewCharacterInput {
    name: String!
    level: Int!
    race: String!
    class: String!
  }

  type Query {
    characters: [Character!]
  }

  type Mutation {
    createCharacter(input: NewCharacterInput!): Character
  }
`;

export default typeDefs;
