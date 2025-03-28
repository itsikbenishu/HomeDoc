const APISQLFeatures = require("./utils/apiSqlFeatures.js");
const { drizzleReader } = require("./postgresDB.js");

exports.getAllHomeDocs = async (event) => {
    try {
      const query = event.queryStringParameters;
  
      const features = new APISQLFeatures(drizzleReader, "home_docs", query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .makeQuery();
  
      const entities = await features.execute();
      const homeDoc = entities.rows;
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "success",
          data: { homeDoc },
        }),
      };
    } catch (err) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          status: "fail",
          message: err.message || "An error occurred",
        }),
      };
    }
  };
  