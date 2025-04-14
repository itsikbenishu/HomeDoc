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
      route: "/{parentId}/sub",
      httpMethod: "PUT",
      handlerFile: "createSubHomeDoc",
    },
  ],
};
