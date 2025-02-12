import { getServerSession } from 'next-auth';
import { Resolvers } from '@/generated/graphql/graphql';
import { createNewCharacter, deleteCharacter, getAllCharacters, getSingleCharacter, updateCharacter } from './db/crud';
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
        const character = await updateCharacter(input.id, input);
        return character;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to update character");
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
        throw new Error("Failed to create character");
      }
    },
    deleteCharacter: async (_root, { id} ) => {
      const user = await getServerSession(authOptions);

      if (!user) {
        throw new Error('Unauthorized');
      }

      try {
        await deleteCharacter(id);
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to delete character");
      }
    }
  },
};

export default resolvers;
