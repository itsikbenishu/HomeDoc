const {
  ChattelsSpecsAttributes,
  ResidenceSpecsAttributes,
} = require("../models/homeDocModel");
const { getDrizzleReader, closePool } = require("../postgresDB");
const drizzleReader = getDrizzleReader();

exports.handler = async (event) => {
  try {
    const validPageTypes = {
      Chattels: {
        attributes: ChattelsSpecsAttributes,
        join: `LEFT JOIN chattels_specs_attributes ON home_Docs.id = chattels_specs_attributes."homeDocId"`,
      },
      Residence: {
        attributes: ResidenceSpecsAttributes,
        join: `LEFT JOIN residence_specs_attributes ON home_Docs.id = residence_specs_attributes."homeDocId"`,
      },
    };

    const pageType = event.pathParameters.pageType;
    const homeDocId = event.pathParameters.id;

    let specsAttributes = {};
    let specColumns = "";
    let specJoin = "";

    if (pageType && validPageTypes[pageType]) {
      specsAttributes = validPageTypes[pageType].attributes;
      specJoin = validPageTypes[pageType].join;
    } else if (pageType) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: "fail",
          message: `Page type ${pageType} is not valid`,
        }),
      };
    }

    specColumns = Object.keys(specsAttributes)
      .filter(
        (column) =>
          column !== "id" && column !== "homeDocId" && column !== "enableRLS"
      )
      .map((column) => `"${column}"`)
      .join(",");
    specColumns = specColumns ? specColumns + "," : "";

    const entity = await drizzleReader.execute(
      `SELECT 
           home_Docs.*, 
          ${specColumns}
           home_docs_dimensions.width, 
           home_docs_dimensions.length 
         FROM home_Docs 
         LEFT JOIN home_docs_dimensions ON home_Docs.id = home_docs_dimensions."homeDocId"
         ${specJoin} 
         WHERE home_Docs.id = ${homeDocId}`
    );

    if (entity.rowCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          status: "success",
          data: null,
        }),
      };
    }

    const subEntities = await drizzleReader.execute(
      `SELECT HomeDocs.id, HomeDocs."interiorEntityKey",HomeDocs.type
          FROM home_docs as HomeDocs
          INNER JOIN home_docs_relations 
                  ON home_docs_relations."subHomeDocId" = HomeDocs.id
          WHERE home_docs_relations."homeDocId" = ${homeDocId}
        `
    );

    const homeDoc = {
      ...entity.rows[0],
      subEntities: subEntities.rowCount !== 0 ? subEntities.rows : [],
    };

    const pool = drizzleReader.client;
    closePool(pool);

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        data: {
          homeDoc,
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
