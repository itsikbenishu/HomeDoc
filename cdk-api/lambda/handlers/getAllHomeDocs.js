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
    const { getDrizzleReader } = require("../postgresDB");
    const drizzleReader = getDrizzleReader();

    const query = event.queryStringParameters || {};

    const features = new APISQLFeatures(drizzleReader, "home_docs", query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .makeQuery();

    const entities = await features.execute();

    const homeDocs = entities.rows || [];
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
