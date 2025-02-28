import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
// import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { NextRequest } from 'next/server';
import { connectToDb } from '../db/connection';
import typeDefs from './typeDefs';
import resolvers from './resolvers';


// creates neon db connection
try {
  connectToDb();
} catch (error) {
  console.log(error);
}

const server = new ApolloServer<{}>({
  resolvers,
  typeDefs,
  // plugins: [ApolloServerPluginLandingPageDisabled()],
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
  }),
});

export async function GET(request: NextRequest) {
  return handler(request)
};

export async function POST(request: NextRequest) {
  return handler(request)
};
