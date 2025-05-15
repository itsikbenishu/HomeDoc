const pg = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = pg;

let postgresDB;

const getPostgresDB = () => {
  console.log({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    max: 10,
    idleTimeoutMillis: 30000,
  });
  if (!postgresDB) {
    const readPool = new Pool({
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

    postgresDB = drizzle({ client: readPool });
  }
  return postgresDB;
};

const closePool = (pool) => {
  if (pool) {
    pool.end();
  }
};

module.exports = { getPostgresDB, closePool };
