import { Character, Resolvers } from "@/generated/graphql";

const data: Character =
  {
    id: '1',
    name: 'Character 1',
    level: 7,
    race: 'Elf',
    class: 'Wizard'
  }

const resolvers: Resolvers = {
  Query: {
    characters: async () => {
      try {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve([data]); 
          }, 1000);
        });
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
  },
  Mutation: {
    createCharacter: async (_root, _input) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(data); 
        }, 1000);
      });
    },
  },
};

export default resolvers;
