import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const AuthProviders = {
  github: 'github',
} as const;

type github = keyof typeof AuthProviders;

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
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GithubProvider({
      clientId: getCredentials(AuthProviders.github).clientId,
      clientSecret: getCredentials(AuthProviders.github).clientSecret,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token }) {
      return token; 
    },
    redirect() {
      return '/';
    }
  }
}