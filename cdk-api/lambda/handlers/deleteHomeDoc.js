const { eq } = require("drizzle-orm");
const { HomeDocs } = require("../models/homeDocModel");
const { drizzleWriter } = require("../postgresDB");

exports.handler = async (event) => {
  try {
    await drizzleWriter
      .delete(HomeDocs)
      .where(eq(HomeDocs.id, event.pathParameters.id));

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
