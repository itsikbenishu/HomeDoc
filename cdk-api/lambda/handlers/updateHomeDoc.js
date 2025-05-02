const { eq } = require("drizzle-orm");
const {
  ChattelsSpecsAttributes,
  HomeDocs,
  HomeDocsDimensions,
  ResidenceSpecsAttributes,
} = require("../models/homeDocModel");
const { getDrizzleWriter } = require("../postgresDB");
const drizzleWriter = getDrizzleWriter();

exports.handler = async (event) => {
  const { id, pageType } = event.pathParameters || {};
  const body = JSON.parse(event.body || {});

  try {
    const updatedHomeDoc = await drizzleWriter
      .update(HomeDocs)
      .set(body)
      .where(eq(HomeDocs.id, id))
      .returning()
      .then((rows) => rows[0]);

    const updatedHomeDocsDimensions = await drizzleWriter
      .insert(HomeDocsDimensions)
      .values({ ...body, homeDocId: id })
      .onConflictDoUpdate({
        target: HomeDocsDimensions.homeDocId,
        set: body,
      })
      .returning()
      .then((rows) => rows[0]);

    const { id: dimId, homeDocId, ...dimensions } = updatedHomeDocsDimensions;

    let specsAttributes;

    switch (pageType) {
      case "Chattels":
        specsAttributes = ChattelsSpecsAttributes;
        break;
      case "Residence":
        specsAttributes = ResidenceSpecsAttributes;
        break;
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({
            status: "fail",
            message: `Page type '${pageType}' is not valid`,
          }),
        };
    }

    const specsAttributesKeys = Object.keys(specsAttributes);
    const filteredBody = Object.keys(body)
      .filter((key) => specsAttributesKeys.includes(key))
      .reduce((obj, key) => ({ ...obj, [key]: body[key] }), {});

    const updatedSpecAttributes = await drizzleWriter
      .insert(specsAttributes)
      .values({ ...filteredBody, homeDocId: id })
      .onConflictDoUpdate({
        target: specsAttributes.homeDocId,
        set: filteredBody,
      })
      .returning()
      .then((rows) => rows[0]);

    const {
      id: specAttrId,
      homeDocId: specAttrHomeDocId,
      ...specificAttributes
    } = updatedSpecAttributes;

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "success",
        data: {
          updatedHomeDoc: {
            ...updatedHomeDoc,
            ...dimensions,
            ...specificAttributes,
          },
        },
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "fail",
        message: err.message || "An error occurred",
      }),
    };
  }
};
