import { 
  HomeDocs, 
  HomeDocsDimensions, 
  HomeDocsRelations, 
  ResidenceSpecsAttributes, 
  ChattelsSpecsAttributes 
} from "../models/homeDocModel.js";
import { postgresDB } from "../server.js";
import { eq } from "drizzle-orm";
import APISQLFeatures from "../utils/apiSqlFeatures.js";

const getAllHomeDocs = async (req, res) => {
  try {
    const features = new APISQLFeatures(postgresDB, "home_docs", req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .makeQuery();

    const entities = await features.execute();
    const homeDoc = entities.rows;

    res.status(200).json({
      status: "success",
      data: {
        homeDoc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message || "An error occurred",
    });
  }
};

const getHomeDoc = async (req, res) => {
  try {
    let specsAttributes = {};
    let specColumns = "";
    let specJoin = "";

    if (req.params.pageType === "Chattels") {
      specsAttributes = ChattelsSpecsAttributes;
      specJoin = `LEFT JOIN chattels_specs_attributes ON home_Docs.id = chattels_specs_attributes."homeDocId"`;
    } else if (req.params.pageType === "Residence") {
      specsAttributes = ResidenceSpecsAttributes;
      specJoin = `LEFT JOIN residence_specs_attributes ON home_Docs.id = residence_specs_attributes."homeDocId"`;
    } else if (req.params.pageType) {
      res.status(400).json({
        status: "fail",
        message: `Page type ${req.params.pageType} is not valid`,
      });
    }

    specColumns = Object.keys(specsAttributes)
      .filter(
        (column) =>
          column !== "id" && column !== "homeDocId" && column !== "enableRLS"
      )
      .map((column) => `"${column}"`)
      .join(",");
    specColumns = specColumns ? specColumns + "," : "";

    const entity = await postgresDB.execute(
      `SELECT 
         home_Docs.*, 
        ${specColumns}
         home_docs_dimensions.width, 
         home_docs_dimensions.length 
       FROM home_Docs 
       LEFT JOIN home_docs_dimensions ON home_Docs.id = home_docs_dimensions."homeDocId"
       ${specJoin} 
       WHERE home_Docs.id = ${req.params.id}`
    );

    if (entity.rowCount === 0) {
      return res.status(404).json({
        status: "success",
        data: null,
      });
    }

    const subEntities = await postgresDB.execute(
      `SELECT HomeDocs.id, HomeDocs."interiorEntityKey",HomeDocs.type
        FROM home_docs as HomeDocs
        INNER JOIN home_docs_relations 
                ON home_docs_relations."subHomeDocId" = HomeDocs.id
        WHERE home_docs_relations."homeDocId" = ${req.params.id}
      `
    );

    const homeDoc = {
      ...entity.rows[0],
      subEntities: subEntities.rowCount !== 0 ? subEntities.rows : [],
    };

    res.status(200).json({
      status: "success",
      data: {
        homeDoc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message || "An error occurred",
    });
  }
};

const createHomeDoc = async (req, res) => {
  try {
    const newHomeDoc = await postgresDB
      .insert(HomeDocs)
      .values(req.body)
      .returning();

    res.status(201).json({
      status: "success",
      data: {
        HomeDoc: newHomeDoc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "An error occurred",
    });
  }
};

const updateHomeDoc = async (req, res) => {
  try {
    const updatedHomeDoc = await postgresDB
      .update(HomeDocs)
      .set(req.body)
      .where(eq(HomeDocs.id, req.params.id))
      .returning()
      .then((rows) => rows[0]);

    const updatedHomeDocsDimensions = await postgresDB
      .insert(HomeDocsDimensions)
      .values({ ...req.body, homeDocId: req.params.id })
      .onConflictDoUpdate({
        target: HomeDocsDimensions.homeDocId,
        set: req.body,
      })
      .returning()
      .then((rows) => rows[0]);

    const { id, homeDocId, ...dimensions } = updatedHomeDocsDimensions;
    let specsAttributes;

    switch (req.params.pageType) {
      case "Chattels":
        specsAttributes = ChattelsSpecsAttributes;
        break;
      case "Residence":
        specsAttributes = ResidenceSpecsAttributes;
        break;
      default:
        return res.status(400).json({
          status: "fail",
          message: `Page type ${req.params.pageType} is not valid`,
        });
    }

    const filteredBody = Object.keys(req.body)
      .filter((key) => Object.keys(specsAttributes).includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});
    console.log(filteredBody);

    const updatedSpecAttributes = await postgresDB
      .insert(specsAttributes)
      .values({ ...filteredBody, homeDocId: req.params.id })
      .onConflictDoUpdate({
        target: specsAttributes.homeDocId,
        set: filteredBody,
      })
      .returning()
      .then((rows) => rows[0]);

    const { specAttrId, specAttrHomeDocId, ...specificAttributes } =
      updatedSpecAttributes;

    res.status(200).json({
      status: "success",
      data: {
        updatedHomeDoc: {
          ...updatedHomeDoc,
          ...dimensions,
          ...specificAttributes,
        },
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message || "An error occurred",
    });
  }
};

const createSubHomeDoc = async (req, res) => {
  try {
    let subHomedocsIds = req.body.subHomedocsIds || [];

    const newHomeDoc = await postgresDB
      .insert(HomeDocs)
      .values({
        ...req.body.newHomeDoc,
        fatherId: req.body.fatherId,
        fatherInteriorEntityKey: req.body.fatherInteriorEntityKey,
      })
      .returning();

    const newSubHomedocIds = {
      homeDocId: req.body.fatherId,
      subHomeDocId: newHomeDoc[0].id,
    };

    const newHomeDocRelation = await postgresDB
      .insert(HomeDocsRelations)
      .values(newSubHomedocIds)
      .returning();

    subHomedocsIds.push(newSubHomedocIds);

    res.status(201).json({
      status: "success",
      data: {
        newHomeDoc: newHomeDoc[0],
        newHomeDocRelation: newHomeDocRelation[0],
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "An error occurred",
    });
  }
};

const deleteHomeDoc = async (req, res) => {
  try {
    await postgresDB.delete(HomeDocs).where(eq(HomeDocs.id, req.params.id));

    res.status(201).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "An error occurred",
    });
  }
};

const getCounts = async (req, res) => {
  try {
    const interiorEntityKeyQeury = req.query.interiorEntityKey
      ? `AND "interiorEntityKey" = ${req.query.interiorEntityKey}`
      : ``;

    const categoryStats = await postgresDB.execute(`
      WITH category_stats AS (
        SELECT category, COUNT(*) AS countHomes
        FROM home_docs
        WHERE type = 'PROPERTY' ${interiorEntityKeyQeury}
        GROUP BY category
      )
      SELECT
        jsonb_agg(
          jsonb_build_object(
            'category', category,
            'countHomes', countHomes
          )
        ) AS "categoryStats",
        SUM(countHomes) AS "totalCount"
      FROM category_stats
    `);

    const stats = categoryStats.rows[0];

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message || "An error occurred",
    });
  }
};

export default {
  getAllHomeDocs,
  getHomeDoc,
  createHomeDoc,
  updateHomeDoc,
  createSubHomeDoc,
  deleteHomeDoc,
  getCounts
};
