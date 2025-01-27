import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest } from 'next/server';
import typeDefs from './schema.graphql';
import mongoose from 'mongoose';
import resolvers from './resolvers';

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const dbName = process.env.NEXT_PUBLIC_MONGODB_DB_NAME;

const connectDB = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri, { dbName });
      console.log('Connected to database successfully');
    }
  } catch (error) {
    console.log(error);
  }
}
connectDB();

const server = new ApolloServer<{}>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req, res) => ({
    req,
    res,
  }),
});

export async function GET(request: NextRequest) {
  console.log('----------------------here');
  return handler(request)
};

export async function POST(request: NextRequest) {
  console.log('----------------------here2');
  return handler(request)
};
