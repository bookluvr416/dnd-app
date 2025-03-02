import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import NeonAdapter from '@auth/neon-adapter';
import { Pool } from '@neondatabase/serverless';

const AuthProviders = {
  github: 'github',
} as const;

type github = keyof typeof AuthProviders;

/**
 * getCredentials
 * @param type github
 * @returns an object with client id and client secret
 */
function getCredentials(type: github) {
  let clientId;
  let clientSecret;

   if (type === AuthProviders.github) {
    clientId = <string>process.env.GITHUB_ID;
    clientSecret = <string>process.env.GITHUB_SECRET;
  }

  if (!clientId || clientId.length === 0) {
    throw new Error(`No clientId for provider ${AuthProviders[type]}`);
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error(`No clientSecret for provider ${AuthProviders[type]}`);
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'database'
  },
  pages: {
    signIn: '/login'
  },
  adapter: NeonAdapter(new Pool({ connectionString: process.env.DATABASE_URL })),
  providers: [
    GithubProvider({
      clientId: getCredentials(AuthProviders.github).clientId,
      clientSecret: getCredentials(AuthProviders.github).clientSecret,
    }),
  ],
  callbacks: {
    async session({ user, session }) {
      if (session?.user) {
        session.user.id = parseInt(user.id);
      }
      return session;
    },
    redirect() {
      return '/';
    }
  }
}