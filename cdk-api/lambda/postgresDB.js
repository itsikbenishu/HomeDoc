const pg = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = pg;

let postgresDB;

const getPostgresDB = () => {
  if (!postgresDB) {
    const pool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      max: 10,
      idleTimeoutMillis: 30000,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    postgresDB = drizzle({ client: pool });
  }
  return postgresDB;
};

const closePool = (pool) => {
  if (pool) {
    pool.end();
  }
};

module.exports = { getPostgresDB, closePool };
