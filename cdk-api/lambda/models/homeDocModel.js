const {
  pgTable,
  pgEnum,
  serial,
  integer,
  numeric,
  text,
  timestamp,
  json,
} = require("drizzle-orm/pg-core");

const {
  HOME_DOC_CATEGORIES,
  HOME_DOC_PAGE_TYPE,
} = require("../../../Constants");

const CategoriesEnum = pgEnum(
  "home_doc_categories",
  Object.keys(HOME_DOC_CATEGORIES)
);

const TypesEnum = pgEnum("home_doc_type", Object.keys(HOME_DOC_PAGE_TYPE));

const HomeDocs = pgTable("home_docs", {
  id: serial().primaryKey(),
  fatherId: integer().references("home_docs", "id", {
    onDelete: "cascade",
  }),
  interiorEntityKey: text(),
  externalId: text(),
  fatherInteriorEntityKey: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
  category: CategoriesEnum(),
  type: TypesEnum(),
  description: text(),
  extraData: json(),
});

const HomeDocsRelations = pgTable("home_docs_relations", {
  id: serial().primaryKey(),
  homeDocId: integer().references(() => HomeDocs.id, {
    onDelete: "cascade",
  }),
  subHomeDocId: integer().references(() => HomeDocs.id, {
    onDelete: "cascade",
  }),
});

const HomeDocsDimensions = pgTable("home_docs_dimensions", {
  id: serial().primaryKey(),
  homeDocId: integer()
    .references(() => HomeDocs.id, {
      onDelete: "cascade",
    })
    .unique(),
  length: numeric(),
  width: numeric(),
});

const ResidenceSpecsAttributes = pgTable("residence_specs_attributes", {
  id: serial().primaryKey(),
  homeDocId: integer()
    .references(() => HomeDocs.id, {
      onDelete: "cascade",
    })
    .unique(),
  area: numeric(),
  subEntitiesQuantity: integer(),
  constructionYear: integer(),
});

const ChattelsSpecsAttributes = pgTable("chattels_specs_attributes", {
  id: serial().primaryKey(),
  homeDocId: integer()
    .references(() => HomeDocs.id, {
      onDelete: "cascade",
    })
    .unique(),
  colors: text(),
  quantity: integer(),
  weight: numeric(),
});

module.exports = {
  HomeDocs,
  HomeDocsDimensions,
  HomeDocsRelations,
  ResidenceSpecsAttributes,
  ChattelsSpecsAttributes,
  CategoriesEnum,
  TypesEnum,
};
