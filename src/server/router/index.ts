import * as trpc from '@trpc/server';
import { Context } from '../context';
import { cocktailRouter } from './cocktailRouter';
import { userRouter } from './userRouter';

export const serverRouter = trpc.router<Context>()
  .merge('user.', userRouter)
  .merge('cocktail.', cocktailRouter);

export type ServerRouter = typeof serverRouter;