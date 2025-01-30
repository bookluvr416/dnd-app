import { NextAuthOptions } from 'next-auth';
import { Octokit } from "@octokit/rest";
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import GithubProvider from 'next-auth/providers/github';

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
      // if (account) {
      //   // First-time login, save the `access_token`, its expiry and the `refresh_token`
      //   return {
      //     ...token,
      //     access_token: account.access_token,
      //     expires_at: account.expires_at,
      //   }
      // } else if ((Date.now() > token.exp * 1000) || token.exp === null) {
      //   // Subsequent logins, but the `access_token` is still valid
      //   return token
      // } else {
      //   try {
      //     const octokit = new Octokit({
      //       authStrategy: createOAuthAppAuth,
      //       auth:{
      //         clientType: 'oauth-app',
      //         clientId: getCredentials(AuthProviders.github).clientId,
      //         clientSecret: getCredentials(AuthProviders.github).clientSecret,
      //       },
      //       baseUrl: 'https://api.github.com',
      //     });
          
      //     const response = await octokit.request('PATCH /applications/{client_id}/token', {
      //       client_id: getCredentials(AuthProviders.github).clientId,
      //       access_token: token.access_token,
      //       headers: {
      //         'X-GitHub-Api-Version': '2022-11-28',
      //         "Accept": "application/json",
      //         "Content-Type": "application/json",
      //       }
      //     });

      //     console.log('--------------------------------')
      //     console.log(response);
 
      //     return {
      //       ...token,
      //       access_token: response.data.token,
      //       expires_at: response.data.expires_at !== null ? (Math.floor(Date.now() / 1000) + response.data.expires_at) : null,
      //     }
      //   } catch (error) {
      //     console.error("Error refreshing access_token", error)
      //     // If we fail to refresh the token, return an error so we can handle it on the page
      //     token.error = "RefreshTokenError"
      //     return token
      //   }
      // }
    },
    redirect() {
      return '/';
    }
  }
}