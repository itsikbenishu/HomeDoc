import dotenv from "dotenv";
import pkg from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import app from "./app.js";  

const { Pool } = pkg;

dotenv.config();

const postgresPool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

const postgresDB = drizzle({ client: postgresPool });

async function testConnection() {
  const client = await postgresPool.connect();
  try {
    await client.query("SELECT NOW()");
    console.log("PostgreSQL connection successful!");
  } catch (err) {
    console.error("PostgreSQL connection error", err.stack);
  } finally {
    client.release();
  }
}

testConnection();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

export { postgresDB };
