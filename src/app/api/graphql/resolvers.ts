import { Character, Resolvers } from "@/generated/graphql";
import { createNewCharacter, getAllCharacters, updateCharacter } from "./db/crud";

const character: Character = {
  id: 1,
  name: 'Test',
  level: 5,
  race: 'Elf',
  characterClass: 'Wizard',
}

const resolvers: Resolvers = {
  Query: {
    characters: async () => {
      try {
        return await getAllCharacters();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
  },
  Mutation: {
    updateCharacter: async (_root, { input} ) => {
      try {
        // const character = await updateCharacter(input.id, input);
        // return character[0];
        return character;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
    createCharacter: async (_root, { input} ) => {
      try {
        // return await createNewCharacter(input);
        return character;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
  },
};

export default resolvers;
