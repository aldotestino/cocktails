import * as trpc from '@trpc/server';
import { cocktailSchema } from '../../common/validation/cocktail';
import { Context } from '../context';
import * as z from 'zod';

export const cocktailRouter = trpc.router<Context>()
  .query('mine', {
    resolve: async ({ ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Esegui il login per visualizzare i tuoi cocktail'
        });
      }

      const cocktails = await ctx.prisma.cocktail.findMany({
        where: {
          userId: ctx.session.user.id
        }
      });

      return {
        code: 201,
        data: {
          cocktails
        }
      };
    }
  })
  .mutation('add', {
    input: cocktailSchema,
    resolve: async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Esegui il login per aggiungere un cocktail'
        });
      }

      try {
        const cocktail = await ctx.prisma.cocktail.create({
          data: {
            ...input,
            userId: ctx.session.user.id
          }
        });

        return {
          code: 201,
          message: 'Cocktail creato correttamente',
          data: {
            cocktail
          }
        };

      } catch (e: any) {
        if (e.code === 'P2002') {
          throw new trpc.TRPCError({
            code: 'CONFLICT',
            message: `Il cocktail "${input.name}" esiste già`
          });
        } else {
          throw new trpc.TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: e.message
          });
        }
      }
    }
  })
  .mutation('remove', {
    input: z.object({
      cocktailId: z.string()
    }),
    resolve: async ({ input, ctx }) => {
      if (!ctx.session?.user?.id) {
        throw new trpc.TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Esegui il login per aggiungere un cocktail'
        });
      }

      try {
        const cocktail = await ctx.prisma.cocktail.findUnique({
          where: {
            id: input.cocktailId
          },
          select: {
            user: {
              select: {
                id: true
              }
            }
          }
        });

        if (!cocktail || cocktail.user.id !== ctx.session.user.id) {
          throw new trpc.TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Non puoi rimuovere questo cocktail'
          });
        }

        await ctx.prisma.cocktail.delete({
          where: {
            id: input.cocktailId
          }
        });

        return {
          code: 200,
          message: 'Cocktail eliminato'
        };

      } catch (e: any) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: e.message
        });
      }
    }
  });