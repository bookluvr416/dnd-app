import { z, ZodType } from 'zod';

const invalidNumberError = 'A number is required'

const pureNumberValidation = z.number({ invalid_type_error: invalidNumberError });
const scoreValidation = z.number({ invalid_type_error: invalidNumberError }).positive().min(1).max(30);
const positiveNumberValidation = z.number({ invalid_type_error: invalidNumberError }).positive();

let schema: ZodType = {} as ZodType;

export const createZodSchema = (abilityIds: number[], skillsIds: number[]) => {
  const abilities = 
    Object.assign(
      {},
      ...abilityIds.map((id) => ({ [`abilityScore${id}`]: scoreValidation })),
      ...abilityIds.map((id) => ({ [`abilityBonus${id}`]: pureNumberValidation }))
    );
  const abilitiesDefaults =
    Object.assign(
      {},
      ...abilityIds.map((id) => ({ [`abilityScore${id}`]: 0 })),
      ...abilityIds.map((id) => ({ [`abilityBonus${id}`]: 0 }))
    );

  const skills = 
    Object.assign(
      {},
      ...skillsIds.map((id) => ({ [`skill${id}`]: pureNumberValidation }))
    );
  const skillsDefaults =
    Object.assign(
      {},
      ...skillsIds.map((id) => ({ [`skill${id}`]: 0 }))
    );

  schema = z.object({
    name: z.string().nonempty({ message: 'Name required' }),
    class: pureNumberValidation.min(1, { message: 'Class required' }),
    level: positiveNumberValidation.max(20),
    hp: positiveNumberValidation,
    ac: positiveNumberValidation,
    speed: positiveNumberValidation,
    initiative: positiveNumberValidation,
    proficiencyBonus: positiveNumberValidation,
    race: pureNumberValidation.min(1, { message: 'Race required' }),
    alignment: pureNumberValidation.min(1, { message: 'Alignment required' }),
    ...abilities,
    ...skills,
  });

  const schemaDefaults = {
    name: '',
    class: 0,
    level: 0,
    hp: 0,
    ac: 0,
    speed: 0,
    initiative: 0,
    proficiencyBonus: 0,
    race: 0,
    alignment: 0,
    ...abilitiesDefaults,
    ...skillsDefaults,
  };

  return { schema, schemaDefaults }
};

export type FormType = z.infer<typeof schema>;

// export const schema = z.object({
//   name: z.string().nonempty({ message: 'Name required' }),
//   class: pureNumberValidation.min(1, { message: 'Class required' }),
//   level: positiveNumberValidation.max(20),
//   hp: positiveNumberValidation,
//   ac: positiveNumberValidation,
//   speed: positiveNumberValidation,
//   initiative: positiveNumberValidation,
//   proficiencyBonus: positiveNumberValidation,
//   race: pureNumberValidation.min(1, { message: 'Race required' }),
//   alignment: pureNumberValidation.min(1, { message: 'Alignment required' }),
//   constitutionScore: scoreValidation,
//   constitutionProficiencyBonus: pureNumberValidation,
//   charismaScore: scoreValidation,
//   charismaProficiencyBonus: pureNumberValidation,
//   dexterityScore: scoreValidation,
//   dexterityProficiencyBonus: pureNumberValidation,
//   intelligenceScore: scoreValidation,
//   intelligenceProficiencyBonus: pureNumberValidation,
//   strengthScore: scoreValidation,
//   strengthProficiencyBonus: pureNumberValidation,
//   wisdomScore: scoreValidation,
//   wisdomProficiencyBonus: pureNumberValidation,
//   acrobatics: pureNumberValidation,
//   animalhandling: pureNumberValidation,
//   arcana: pureNumberValidation,
//   athletics: pureNumberValidation,
//   deception: pureNumberValidation,
//   history: pureNumberValidation,
//   insight: pureNumberValidation,
//   intimidation: pureNumberValidation,
//   investigation: pureNumberValidation,
//   medicine: pureNumberValidation,
//   nature: pureNumberValidation,
//   perception: pureNumberValidation,
//   performance: pureNumberValidation,
//   persuasion: pureNumberValidation,
//   religion: pureNumberValidation,
//   sleightofhand: pureNumberValidation,
//   stealth: pureNumberValidation,
//   survival: pureNumberValidation
// });

// export type FormData = z.infer<typeof schema>;

// export type schemaFields = {
//   name: string;
//   class: number;
//   level: number;
//   hp: number;
//   ac: number;
//   speed: number;
//   initiative: number;
//   proficiencyBonus: number;
//   race: string;
//   alignment: string;
//   constitutionScore: number;
//   constitutiencyBonus: number;
//   charismaScore: number;
//   charismaProficiencyBonus: number;
//   dexterityScore: number;
//   dexterityProficiencyBonus: number;
//   intelligenceScore: number;
//   intelligenceProficiencyBonus: number;
//   strengthScore: number;
//   strengthProficiencyBonus:number;
//   wisdomScore: number;
//   wisdomProficiencyBonus: number;
//   acrobatics: number;
//   animalhandling: number;
//   arcana: number;
//   athletics: number;
//   deception: number;
//   history: number;
//   insight: number;
//   intimidation: number;
//   investigation: number;
//   medicine: number;
//   nature: number;
//   perception: number;
//   performance: number;
//   persuasion: number;
//   religion: number;
//   sleightofhand: number;
//   stealth: number;
//   survival: number;
// };

// export const schemaDefaults = {
//   name: '',
//   class: 0,
//   level: 0,
//   hp: 0,
//   ac: 0,
//   speed: 0,
//   initiative: 0,
//   proficiencyBonus: 0,
//   race: 0,
//   alignment: 0,
//   constitutionScore: 0,
//   constitutionProficiencyBonus: 0,
//   charismaScore: 0,
//   charismaProficiencyBonus: 0,
//   dexterityScore: 0,
//   dexterityProficiencyBonus: 0,
//   intelligenceScore: 0,
//   intelligenceProficiencyBonus: 0,
//   strengthScore: 0,
//   strengthProficiencyBonus:0,
//   wisdomScore: 0,
//   wisdomProficiencyBonus: 0,
//   acrobatics: 0,
//   animalhandling: 0,
//   arcana: 0,
//   athletics: 0,
//   deception: 0,
//   history: 0,
//   insight: 0,
//   intimidation: 0,
//   investigation: 0,
//   medicine: 0,
//   nature: 0,
//   perception: 0,
//   performance: 0,
//   persuasion: 0,
//   religion: 0,
//   sleightofhand: 0,
//   stealth: 0,
//   survival: 0
// };
