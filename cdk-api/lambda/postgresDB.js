const pg = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = pg;

let drizzleWriter;
let drizzleReader;

const getDrizzleWriter = () => {
  if (!drizzleWriter) {
    const writePool = new Pool({
      host: process.env.POSTGRES_WRITE_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      max: 10,
      idleTimeoutMillis: 30000,
    });

    drizzleWriter = drizzle({ client: writePool });
  }
  return drizzleWriter;
};

const getDrizzleReader = () => {
  if (!drizzleReader) {
    const readPool = new Pool({
      host: process.env.POSTGRES_READ_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      max: 10,
      idleTimeoutMillis: 30000,
    });

    drizzleReader = drizzle({ client: readPool });
  }
  return drizzleReader;
};

const closePool = (pool) => {
  if (pool) {
    pool.end();
  }
};

module.exports = { getDrizzleWriter, getDrizzleReader, closePool };
