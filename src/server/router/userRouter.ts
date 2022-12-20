import * as trpc from '@trpc/server';
import { signupSchema, updateProfileSchema } from '../../common/validation/auth';
import { Context } from '../context';
import { hash } from 'argon2';

export const userRouter = trpc.router<Context>()
  .mutation('update', {
    input: updateProfileSchema,
    resolve: async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Devi essere loggato per modificare il profilo'
        });
      }

      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          ...input
        }
      });

      return {
        code: 200,
        message: 'Aggiornamento effettuato'
      };
    }
  })
  .mutation('signup', {
    input: signupSchema,
    resolve: async ({ input, ctx }) => {
      const { email, username, password } = input;

      try {
        const hashedPassword = await hash(password);
        await ctx.prisma.user.create({
          data: {
            email,
            username,
            password: hashedPassword
          }
        });

        return {
          code: 201,
          message: 'Account created succesfully'
        };
      } catch (e: any) {
        if (e.code === 'P2002') {
          throw new trpc.TRPCError({
            code: 'CONFLICT',
            message: 'Email o nome utente già in uso'
          });
        } else {
          throw new trpc.TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: e.message
          });
        }
      }
    }
  });