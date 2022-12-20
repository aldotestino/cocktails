import * as z from 'zod';

export const signinSchema = z.object({
  username: z.string(),
  password: z.string().min(5)
});

export const signupSchema = signinSchema.extend({
  email: z.string().email()
});

export const updateProfileSchema = z.object({
  email: z.string().email(),
  username: z.string()
});

export type SigninSchema = z.infer<typeof signinSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;