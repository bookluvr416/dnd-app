import { getServerSession } from 'next-auth';
import { Resolvers } from '@/generated/graphql';
import { createNewCharacter, getAllCharacters, updateCharacter } from './db/crud';
import { authOptions } from '@/lib/auth';

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
      const user = await getServerSession(authOptions);

      if (!user) {
        throw new Error('Unauthorized');
      }

      try {
        const character = await updateCharacter(input.id, input);
        return character[0];
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch characters");
      }
    },
    createCharacter: async (_root, { input} ) => {
      const user = await getServerSession(authOptions);

      if (!user) {
        throw new Error('Unauthorized');
      }

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
