import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer, BaseContext, GraphQLRequestContext } from '@apollo/server';
// import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { NextRequest } from 'next/server';
import { connectToDb } from '../db/connection';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { GraphQLError } from 'graphql';

type DidEncounterErrorsContext<TContext extends BaseContext = BaseContext> = GraphQLRequestContext<TContext> & {
  errors: ReadonlyArray<GraphQLError>;
};

// plugin to log events when a request reaches apollo
const apolloPlugin = {
  async requestDidStart() {
    console.log('Request started!');

    return {
      async parsingDidStart() {
        console.log('Parsing started!');
      },

      async validationDidStart() {
        console.log('Validation started!');
      },

      async didEncounterErrors(context: DidEncounterErrorsContext) {
        console.log('Did encounter error!');
        console.log(JSON.stringify(context.errors));
      }
    }
  },
};


// creates neon db connection
try {
  connectToDb();
} catch (error) {
  console.log(error);
}

const server = new ApolloServer<{}>({
  resolvers,
  typeDefs,
  plugins: [apolloPlugin]
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
