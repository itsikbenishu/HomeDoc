const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const withCors = (handler) => {
  return async (event, context) => {
    const origin = event.headers?.origin || "";
    console.log(event.headers?.origin);
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
