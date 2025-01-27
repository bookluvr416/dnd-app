import { Resolvers } from "@/generated/graphql";
import CharacterModel from "./models/models";

const resolvers: Resolvers = {
  Query: {
    characters: async () => {
      try {
        return await CharacterModel.find()
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
  },
  Mutation: {
    createCharacter: async (_root, input) => {
      return await CharacterModel.create({...input.input});
    }
  }
};

export default resolvers;
