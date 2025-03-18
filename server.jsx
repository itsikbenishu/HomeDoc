const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

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

module.exports = { postgresDB };
