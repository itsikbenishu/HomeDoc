import dotenv from "dotenv";
import pkg from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";

const { Pool } = pkg;

dotenv.config();

const writePool = new Pool({
  host: process.env.POSTGRES_WRITE_HOST, 
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const readPool = new Pool({
  host: process.env.POSTGRES_READ_HOST, 
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const drizzleWriter = drizzle({ client: writePool });
const drizzleReader = drizzle({ client: readPool });
  

export { drizzleWriter,drizzleReader };
