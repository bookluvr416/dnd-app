import { z, ZodType } from 'zod';

const invalidNumberError = 'A number is required';
const invalidIntError = 'A whole number is required';

const pureNumberValidation = z.number({ invalid_type_error: invalidNumberError }).int({ message: invalidIntError });
const scoreValidation = z.number({ invalid_type_error: invalidNumberError }).positive().min(1).max(30).int({ message: invalidIntError });
const positiveNumberValidation = z.number({ invalid_type_error: invalidNumberError }).positive().int({ message: invalidIntError });
const nonNegativeValidation = z.number({ invalid_type_error: invalidNumberError }).nonnegative().int({ message: invalidIntError });

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
    initiative: nonNegativeValidation,
    proficiencyBonus: nonNegativeValidation,
    race: pureNumberValidation.min(1, { message: 'Race required' }),
    alignment: pureNumberValidation.min(1, { message: 'Alignment required' }),
    ...abilities,
    ...skills,
  });

  const schemaDefaults = {
    name: '',
    class: 0,
    level: 1,
    hp: 1,
    ac: 1,
    speed: 1,
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