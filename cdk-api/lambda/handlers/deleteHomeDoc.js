const { eq } = require("drizzle-orm");
const { HomeDocs } = require("../models/homeDocModel");
const { getPostgresDB, closePool } = require("../postgresDB");
const postgresDB = getPostgresDB();

exports.handler = async (event) => {
  try {
    await postgresDB
      .delete(HomeDocs)
      .where(eq(HomeDocs.id, event.pathParameters.id));

    const pool = postgresDB.client;
    closePool(pool);

    return {
      statusCode: 201,
      body: JSON.stringify({
        status: "success",
        data: null,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "fail",
        message: err.message || "An error occurred",
      }),
    };
  }
};
