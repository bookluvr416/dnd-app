import { z, ZodType } from 'zod';

const maxUploadSize = 1024 * 1024 * 5; // 5MB
const acceptedFileTypes = ['image/png', 'image/webp', 'image/jpg', 'image/jpeg'];

const invalidNumberError = 'A number is required';
const invalidIntError = 'A whole number is required';

const pureNumberValidation = z.number({ invalid_type_error: invalidNumberError }).int({ message: invalidIntError });
const scoreValidation = z.number({ invalid_type_error: invalidNumberError }).positive().min(1).max(30).int({ message: invalidIntError });
const positiveNumberValidation = z.number({ invalid_type_error: invalidNumberError }).positive().int({ message: invalidIntError });
const nonNegativeValidation = z.number({ invalid_type_error: invalidNumberError }).nonnegative().int({ message: invalidIntError });
const fileValidation = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= maxUploadSize;
  }, 'File size must be less than 5MB')
  .refine((file) => {
    if (!file) return true;
    if (file) return acceptedFileTypes.includes(file.type);
  }, 'File must be a PNG, WEBP, JPG, or JPEG');

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
    characterImage: fileValidation,
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
    characterImage: undefined,
  };

  return { schema, schemaDefaults }
};

export type FormType = z.infer<typeof schema>;