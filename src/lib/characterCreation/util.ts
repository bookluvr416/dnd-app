import { CreateCharacterInput, NewCharacterAbilityInput } from '@/generated/graphql/graphql';
import { uploadFile } from '@/lib/fileUploads/clientFileUpload';
import { FormType } from '@/lib/formSchema/zodSchema';

/**
 * Calls function to upload image to object store
 * @param characterImage File
 */
export const uploadImage = async (characterImage: File) => {
  const url = await uploadFile(characterImage, 'characterImages');

  return url ?? null;
}

/**
 * createInput
 * Creates the graphql input to send to graphql
 * @param data 
 * @returns 
 */
export const createInput = async (data: FormType) => {
  const input: CreateCharacterInput = {} as CreateCharacterInput;

  // character fields
  input.character = {
    name: data.name,
    level: data.level,
    classId: data.class,
    alignmentId: data.alignment,
    raceId: data.race,
    armorClass: data.ac,
    hp: data.hp,
    initiative: data.initiative,
    proficiencyBonus: data.proficiencyBonus,
    speed: data.speed,
  }

  input.skills = [];
  input.abilities = [];

  for (const [key, value] of Object.entries(data)) {

    // skills
    if (key.includes('skill')) {
      const id = key.slice(5);
      input.skills.push({
        skillId: parseInt(id),
        skillProficiency: value as number,
      })
    }

    // abilities
    if (key.includes('ability')) {
      const id = parseInt(key.slice(12));
      const index = input.abilities.findIndex((ability) => ability?.abilityId === id);

      if (key.includes('Score')) {
        if (index !== -1) {
          input.abilities[index]!.abilityScore = value as number;
        } else {
          input.abilities.push({
            abilityId: id,
            abilityScore: value
          } as NewCharacterAbilityInput)
        }
      } else {
        if (index !== -1) {
          input.abilities[index]!.proficiencyBonus = value as number;
        } else {
          input.abilities.push({
            abilityId: id,
            proficiencyBonus: value,
          } as NewCharacterAbilityInput)
        }
      }        
    }
  };

  return input;
}
