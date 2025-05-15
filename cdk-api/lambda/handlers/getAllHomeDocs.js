exports.handler = async (event) => {
  try {
    if (event?.source === "warm-up") {
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "success",
          message: "Lambda is warm!",
        }),
      };
    }

    const APISQLFeatures = require("../utils/apiSqlFeatures.js");
    const { getPostgresDB, closePool } = require("../postgresDB");
    const postgresDB = getPostgresDB();

    const query = event.queryStringParameters || {};

    const features = new APISQLFeatures(postgresDB, "home_docs", query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .makeQuery();

    const entities = await features.execute();

    const homeDocs = entities.rows || [];
    const pool = postgresDB.client;
    closePool(pool);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        data: { homeDocs },
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
