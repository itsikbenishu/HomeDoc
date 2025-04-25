module.exports = function withCors(handler, corsOptions) {
  return async (event, context) => {
    const response = await handler(event, context);
    response.headers = {
      ...response.headers,
      "Access-Control-Allow-Origin": corsOptions.allowOrigins,
      "Access-Control-Allow-Methods": sOptions.allowMethods,
      "Access-Control-Allow-Headers": corsOptions.allowHeaders,
    };
    return response;
  };
};
