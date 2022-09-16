import * as z from 'zod';

export const cocktailSchema = z.object({
  name: z.string({ required_error: 'Questo campo è obbligatorio', invalid_type_error: 'Must be of type string' }).min(1),
  ingredients: z.array(z.string({ invalid_type_error: 'Must be of type string' }).min(1)).min(1, { message: 'Deve contenere almeno un ingrediente' }),
  addedBy: z.string({ invalid_type_error: 'Must be of type string' }).min(1).nullable()
});

export type CocktailSchema = z.infer<typeof cocktailSchema>