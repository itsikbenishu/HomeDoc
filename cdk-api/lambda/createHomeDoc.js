import { HomeDocs } from "../../models/homeDocModel.js";
import { drizzleReader } from "../../postgresDB.js";

export const createHomeDoc = async (event) => {
  try {
    const body = JSON.parse(event.body); 

    const newHomeDoc = await drizzleReader
      .insert(HomeDocs)
      .values(body)
      .returning();

    return {
      statusCode: 201,
      body: JSON.stringify({
        status: "success",
        data: {
          HomeDoc: newHomeDoc,
        },
      }),
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "fail",
        message: err.message || "An error occurred",
      }),
    };
  }
};
