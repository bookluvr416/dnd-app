import { z, ZodType } from 'zod';

const numberValidation = z.number({ invalid_type_error: 'A number is required' }).nonnegative().max(30);

export const schema = z.object({
  'd4Input': numberValidation,
  'd6Input': numberValidation,
  'd8Input': numberValidation,
  'd10Input': numberValidation,
  'd12Input': numberValidation,
  'd20Input': numberValidation,
});

export const schemaDefaults = {
  'd4Input': 0,
  'd6Input': 0,
  'd8Input': 0,
  'd10Input': 0,
  'd12Input': 0,
  'd20Input': 0,
};


export type FormType = z.infer<typeof schema>;