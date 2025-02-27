"use client"

import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

// have a function to create a client
function makeClient() {
  const rootURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://dnd-app-dun.vercel.app';
  const httpLink = new HttpLink({
    uri: `${rootURL}/api/graphql`,
    fetchOptions: { cache: "default" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

// component to wrap the app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
