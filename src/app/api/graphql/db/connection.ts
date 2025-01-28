import { Pool } from '@neondatabase/serverless';
import { Database } from './types' // this is the Database interface we defined earlier
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely'

let db: Kysely<Database>;

export const connectToDb = () => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
      database: process.env.PGDATABASE,
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      max: 10,
    }),
  });

  // Database interface is passed to Kysely's constructor, and from now on, Kysely 
  // knows your database structure.
  // Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
  // to communicate with your database.
  db = new Kysely<Database>({
    dialect,
    plugins: [new CamelCasePlugin()]
  });

  console.log('connected to db successfully');
};

export { db };
