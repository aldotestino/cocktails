import * as trpc from '@trpc/server';
import { cocktailSchema } from '../../common/validation/cocktail';
import { Context } from '../context';

export const cocktailRouter = trpc.router<Context>()
  .mutation('add', {
    input: cocktailSchema,
    resolve: async ({ input, ctx }) => {
      try {

        const cocktail = await ctx.prisma.cocktail.create({
          data: input
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
  });