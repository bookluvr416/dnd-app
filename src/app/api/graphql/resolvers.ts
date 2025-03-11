import { getServerSession } from 'next-auth';
import { encode } from 'html-entities';
import { Resolvers } from '@/generated/graphql/graphql';
import { createNewCharacter, deleteCharacter, getAllCharacters, getSingleCharacter, updateCharacter } from '../db/characterCrud';
import { getAbilities, getAlignment, getClasses, getRaces, getSkills } from '../db/referenceValues';
import { authOptions } from '@/lib/auth';

const resolvers: Resolvers = {
  Query: {
    characters: async (_root, { input }) => {
      try {
        const sanitized = sanitizeVariables(input);
        return await getAllCharacters(sanitized);
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
    races: async () => {
      try {
        return await getRaces();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch races")
      }
    },
    classes: async () => {
      try {
        return await getClasses();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch classes")
      }
    },
    alignments: async () => {
      try {
        return await getAlignment();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch alignments")
      }
    },
    skills: async () => {
      try {
        return await getSkills();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch skills")
      }
    },
    abilities: async () => {
      try {
        return await getAbilities();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch abilities")
      }
    },
    referenceValues: async () => {
      try {
        const alignments = await getAlignment();
        const skills = await getSkills();
        const abilities = await getAbilities();
        const races = await getRaces();
        const classes = await getClasses();

        return {
          alignments,
          skills,
          abilities,
          races,
          classes,
        }
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch reference values")
      }
    }
  },
  Mutation: {
    updateCharacter: async (_root, { input} ) => {
      const session = await getServerSession(authOptions);

      if (!session) {
        throw new Error('Unauthorized');
      }

      try {
        const sanitized = sanitizeVariables(input);
        const character = await updateCharacter(input.id, sanitized);
        return character;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to update character");
      }
    },
    createCharacter: async (_root, { input} ) => {
      const session = await getServerSession(authOptions);

      if (!session) {
        throw new Error('Unauthorized');
      }

      try {
        const sanitized = sanitizeVariables(input);
        return await createNewCharacter(sanitized, session.user.id);
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create character");
      }
    },
    deleteCharacter: async (_root, { id} ) => {
      const session = await getServerSession(authOptions);

      if (!session) {
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

// Function to sanitize variables
function sanitizeVariables(input: any): any {
  
  // Deep clone to avoid modifying the original object
  const sanitized = JSON.parse(JSON.stringify(input))
  
  // Recursively sanitize all properties
  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key]
    
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (typeof value === 'object' && value !== null) {
      // Recursively sanitize nested objects and arrays
      sanitized[key] = sanitizeVariables(value)
    }
  })
  
  return sanitized
}

// replace < > / ; [ ] * and then encode the rest
function sanitizeString(str: string): string {
  const replaced = str
      .replace(/</g, '')
      .replace(/>/g, '')
      .replace(/\//g, '')
      .replace(/;/g, '')
      .replace(/\[/g, '')
      .replace(/]/g, '')
      .replace(/\*/g, '')
  return encode(replaced).trim()
}

export default resolvers;
