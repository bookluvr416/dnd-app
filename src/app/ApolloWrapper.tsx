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
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            characters: {
              keyArgs: ['page'],
              
              // Custom merge function to handle merging different pages in cache
              merge(existing, incoming, { args }) {
                // If no args or no page, return incoming
                if (!args) return incoming;

                const { page = 1 } = args.input;

                const merged = {
                  ...incoming,
                  currentPage: page,
                  pages: {
                    ...(existing?.pages || {}),
                    [page]: incoming.characters
                  }
                };

                return merged;
              },
              
              // Read function to extract just the current page data when requested
              read(existing, { variables }) {
                if (!existing || !variables) return existing;

                const page = existing.currentPage;
                const characters = existing.pages?.[page] || [];

                return {
                  ...existing,
                  characters,
                  currentPage: page
                };
              }
            }
          }
        }
      }
    }),
    link: httpLink,
    defaultOptions: {
      watchQuery: {
        // This controls whether to fetch from network, cache, or both
        fetchPolicy: 'cache-first', // Get quick response from cache, but also update from network
        nextFetchPolicy: 'cache-and-network',
      },
    },
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
