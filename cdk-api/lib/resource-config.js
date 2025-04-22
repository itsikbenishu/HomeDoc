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
  ],
};
