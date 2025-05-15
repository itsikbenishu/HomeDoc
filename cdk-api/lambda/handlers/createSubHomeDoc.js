const { getPostgresDB, closePool } = require("../postgresDB");
const postgresDB = getPostgresDB();
const { HomeDocsRelations, HomeDocs } = require("../models/homeDocModel");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const fatherId = event.pathParameters.fatherId;
    let subHomedocsIds = body.subHomedocsIds || [];

    const newHomeDoc = await postgresDB
      .insert(HomeDocs)
      .values({
        ...body.newHomeDoc,
        fatherId: fatherId,
        fatherInteriorEntityKey: body.fatherInteriorEntityKey,
      })
      .returning();

    const newSubHomedocIds = {
      homeDocId: fatherId,
      subHomeDocId: newHomeDoc[0].id,
    };

    const newHomeDocRelation = await postgresDB
      .insert(HomeDocsRelations)
      .values(newSubHomedocIds)
      .returning();

    subHomedocsIds.push(newSubHomedocIds);

    const pool = postgresDB.client;
    closePool(pool);

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
