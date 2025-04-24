module.exports = {
  baseRoute: "/api/HomeDocs",
  functions: [
    {
      lambdaName: "GetAllHomeDocsFunction",
      route: "/",
      httpMethod: "GET",
      handlerFile: "getAllHomeDocs",
    },
    {
      lambdaName: "CreateHomeDocFunction",
      route: "/",
      httpMethod: "POST",
      handlerFile: "createHomeDoc",
    },
    {
      lambdaName: "CreateSubHomeDocFunction",
      route: "/HomeDoc/{fatherId}/subHomeDoc",
      httpMethod: "PUT",
      handlerFile: "createSubHomeDoc",
    },
    {
      lambdaName: "DeleteHomeDocFunction",
      route: "/{id}",
      httpMethod: "DELETE",
      handlerFile: "deleteHomeDoc",
    },
    {
      lambdaName: "GetHomeDocStatsFunction",
      route: "/stats",
      httpMethod: "GET",
      handlerFile: "getHomeDocStats",
    },
    {
      lambdaName: "GetHomeDocFunction",
      route: "/{id}",
      httpMethod: "GET",
      handlerFile: "getHomeDoc",
    },
    {
      lambdaName: "GetHomeDocWithPageTypeFunction",
      route: "/typed/{pageType}/{id}",
      httpMethod: "GET",
      handlerFile: "getHomeDoc",
    },
    {
      lambdaName: "UpdateHomeDocFunction",
      route: "/typed/{pageType}/{id}",
      httpMethod: "PATCH",
      handlerFile: "updateHomeDoc",
    },
  ],
};
