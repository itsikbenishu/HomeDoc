const { getPostgresDB, closePool } = require("../postgresDB");
const postgresDB = getPostgresDB();

exports.handler = async (event) => {
  try {
    const interiorEntityKeyQeury = event.queryStringParameters
      ?.interiorEntityKey
      ? `AND "interiorEntityKey" ILIKE '%${event.queryStringParameters.interiorEntityKey}%'`
      : ``;

    const categoryStats = await postgresDB.execute(`
        WITH category_stats AS (
          SELECT category, COUNT(*) AS countHomes
          FROM home_docs
          WHERE type = 'PROPERTY' ${interiorEntityKeyQeury}
          GROUP BY category
        )
        SELECT
          jsonb_agg(
            jsonb_build_object(
              'category', category,
              'countHomes', countHomes
            )
          ) AS "categoryStats",
          SUM(countHomes) AS "totalCount"
        FROM category_stats
      `);

    const stats = categoryStats.rows[0];

    const pool = postgresDB.client;
    closePool(pool);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        data: {
          stats,
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
