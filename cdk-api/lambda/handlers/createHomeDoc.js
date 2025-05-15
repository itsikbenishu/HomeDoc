const { getPostgresDB, closePool } = require("../postgresDB");
const postgresDB = getPostgresDB();
const { HomeDocs } = require("../models/homeDocModel");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const newHomeDoc = await postgresDB
      .insert(HomeDocs)
      .values(body)
      .returning();

    const pool = postgresDB.client;
    closePool(pool);

    return {
      statusCode: 201,
      body: JSON.stringify({
        status: "success",
        data: {
          HomeDoc: newHomeDoc,
        },
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
