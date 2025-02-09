import { getServerSession } from 'next-auth';
import { Resolvers } from '@/generated/graphql';
import { createNewCharacter, getAllCharacters, getSingleCharacter, updateCharacter } from './db/crud';
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
    character: async (_root, { id }) => {
      try {
        return await getSingleCharacter(id);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch character");
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
        const cleanedInput = Object.fromEntries(
          Object.entries(input).map(([key, value]) => [key, value === null ? undefined : value])
        );
        const character = await updateCharacter(input.id, cleanedInput);
        return character;
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
