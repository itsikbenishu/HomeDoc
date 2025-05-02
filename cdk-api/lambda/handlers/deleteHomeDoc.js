const { eq } = require("drizzle-orm");
const { HomeDocs } = require("../models/homeDocModel");
const { getDrizzleWriter, closePool } = require("../postgresDB");
const drizzleWriter = getDrizzleWriter();

exports.handler = async (event) => {
  try {
    await drizzleWriter
      .delete(HomeDocs)
      .where(eq(HomeDocs.id, event.pathParameters.id));

    const pool = drizzleWriter.client;
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
