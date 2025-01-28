import { Resolvers } from "@/generated/graphql";
import { createNewCharacter, getAllCharacters, updateCharacter } from "./db/crud";

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
        const character = await updateCharacter(input.id, input);
        return character[0];
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
    createCharacter: async (_root, { input} ) => {
      try {
        return await createNewCharacter(input);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
  },
};

export default resolvers;
