const { drizzleWriter } = require("../postgresDB");
const { HomeDocsRelations, HomeDocs } = require("../models/homeDocModel");

exports.handler = async (event) => {
  try {
    let subHomedocsIds = event.body.subHomedocsIds || [];

    const newHomeDoc = await drizzleWriter
      .insert(HomeDocs)
      .values({
        ...event.body.newHomeDoc,
        fatherId: event.pathParameters.fatherId,
        fatherInteriorEntityKey: event.body.fatherInteriorEntityKey,
      })
      .returning();

    const newSubHomedocIds = {
      homeDocId: event.pathParameters.fatherId,
      subHomeDocId: newHomeDoc[0].id,
    };

    const newHomeDocRelation = await drizzleWriter
      .insert(HomeDocsRelations)
      .values(newSubHomedocIds)
      .returning();

    subHomedocsIds.push(newSubHomedocIds);

    return {
      statusCode: 201,
      body: JSON.stringify({
        status: "success",
        data: {
          newHomeDoc: newHomeDoc[0],
          newHomeDocRelation: newHomeDocRelation[0],
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
