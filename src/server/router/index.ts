import * as trpc from '@trpc/server';
import { Context } from '../context';
import { cocktailRouter } from './cocktailRouter';

export const serverRouter = trpc.router<Context>()
  .merge('cocktail.', cocktailRouter);

export type ServerRouter = typeof serverRouter;