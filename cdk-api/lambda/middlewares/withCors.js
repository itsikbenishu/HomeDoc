const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const allowedOrigins = [process.env.LOCAL_DOMAIN];

const withCors = (handler) => {
  return async (event, context) => {
    const origin = event.headers?.origin || "";
    const isAllowed = allowedOrigins.includes(origin);

    const result = await handler(event, context);

    return {
      ...result,
      headers: {
        ...(result.headers || {}),
        "Access-Control-Allow-Origin": isAllowed ? origin : "",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
};

module.exports = withCors;
