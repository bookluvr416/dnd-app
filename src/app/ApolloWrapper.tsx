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
                
                // If no existing data, create a new object with empty characters array
                const merged = existing ? { ...existing } : { 
                  characters: [],
                  totalCount: 0,
                  totalPages: 0,
                  pageSize: args.input.pageSize,
                  hasNextPage: false,
                  hasPreviousPage: false
                };
                
                // Always take the latest metadata values
                merged.totalCount = incoming.totalCount;
                merged.totalPages = incoming.totalPages;
                merged.pageSize = incoming.pageSize;
                merged.hasNextPage = incoming.hasNextPage;
                merged.hasPreviousPage = incoming.hasPreviousPage;
                
                // Store the characters for this specific page
                // Note: We're creating a mutable copy of the characters array
                const characters = merged.characters.slice(0);
                
                // Insert the incoming characters at the right position
                const pageStartIndex = (page - 1) * incoming.pageSize;
    
                // Expand the array if needed to fit all characters
                if (characters.length < pageStartIndex + incoming.characters.length) {
                  characters.length = pageStartIndex + incoming.characters.length;
                }
                
                // Insert the characters at the right position
                for (let i = 0; i < incoming.characters.length; i++) {
                  characters[pageStartIndex + i] = incoming.characters[i];
                }
                
                // Update the merged object with the new characters array
                merged.characters = characters;
                merged.currentPage = page; // Store the current page

                return merged;
              },
              
              // Read function to extract just the current page data when requested
              read(existing, { variables }) {
                if (!existing || !variables) return existing;

                const page = existing.currentPage;
                const pageSize = existing.pageSize;
                const pageStartIndex = (page - 1) * pageSize;
                
                // Create a copy with just the characters for the requested page
                return {
                  ...existing,
                  currentPage: page,
                  characters: existing.characters.slice(
                    pageStartIndex, 
                    pageStartIndex + pageSize
                  ).filter(Boolean) // Filter out any null/undefined values
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
