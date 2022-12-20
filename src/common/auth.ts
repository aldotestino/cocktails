import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verify } from 'argon2';
import { prisma } from './prisma';
import { signinSchema } from './validation/auth';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'email',
          placeholder: 'La tua e-mail'
        },
        password: {
          label: 'Password',
          type: 'password',
        }
      },
      async authorize(credentials, req) {
        const creds = await signinSchema.parseAsync(credentials);
        const user = await prisma.user.findUnique({
          where: {
            username: creds.username
          }
        });
        if (!user) {
          return null;
        }
        const passwordMatch = await verify(user.password, creds.password);
        if (!passwordMatch) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.username
        };
      },
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.SECRET,
  pages: {
    signIn: '/signin',
    newUser: '/signup'
  }
};