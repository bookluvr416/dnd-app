import { z } from 'zod';

export const schema = z.object({
  name: z.string().nonempty({ message: 'Name required' }),
  class: z.number().min(1, { message: 'Class required.' }),
  level: z.number().positive().max(20),
  hp: z.number().positive(),
  ac: z.number().positive(),
  speed: z.number().positive(),
  initiative: z.number().positive(),
  proficiencyBonus: z.number().positive(),
  race: z.number().min(1, { message: 'Race required.' }),
  alignment: z.number().min(1, { message: 'Alignment required.' }),
  constitutionScore: z.number().positive().min(1).max(30),
  constitutionProficiencyBonus: z.number(),
  charismaScore: z.number().positive().min(1).max(30),
  charismaProficiencyBonus: z.number(),
  dexterityScore: z.number().positive().min(1).max(30),
  dexterityProficiencyBonus: z.number(),
  intelligenceScore: z.number().positive().min(1).max(30),
  intelligenceProficiencyBonus: z.number(),
  strengthScore: z.number().positive().min(1).max(30),
  strengthProficiencyBonus: z.number(),
  wisdomScore: z.number().positive().min(1).max(30),
  wisdomProficiencyBonus: z.number(),
  acrobatics: z.number(),
  animalhandling: z.number(),
  arcana: z.number(),
  athletics: z.number(),
  deception: z.number(),
  history: z.number(),
  insight: z.number(),
  intimidation: z.number(),
  investigation: z.number(),
  medicine: z.number(),
  nature: z.number(),
  perception: z.number(),
  performance: z.number(),
  persuasion: z.number(),
  religion: z.number(),
  sleightofhand: z.number(),
  stealth: z.number(),
  survival: z.number()
});

export type FormData = z.infer<typeof schema>;

export type schemaFields = {
  name: string;
  class: number;
  level: number;
  hp: number;
  ac: number;
  speed: number;
  initiative: number;
  proficiencyBonus: number;
  race: string;
  alignment: string;
  constitutionScore: number;
  constitutiencyBonus: number;
  charismaScore: number;
  charismaProficiencyBonus: number;
  dexterityScore: number;
  dexterityProficiencyBonus: number;
  intelligenceScore: number;
  intelligenceProficiencyBonus: number;
  strengthScore: number;
  strengthProficiencyBonus:number;
  wisdomScore: number;
  wisdomProficiencyBonus: number;
  acrobatics: number;
  animalhandling: number;
  arcana: number;
  athletics: number;
  deception: number;
  history: number;
  insight: number;
  intimidation: number;
  investigation: number;
  medicine: number;
  nature: number;
  perception: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightofhand: number;
  stealth: number;
  survival: number;
}
