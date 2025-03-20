import {
  pgTable,
  pgEnum,
  serial,
  integer,
  text,
  timestamp,
  json,
} from "drizzle-orm/pg-core";
import { HOME_DOC_CATEGORIES, HOME_DOC_PAGE_TYPE } from "../src/Constants.js";

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
  fatherInteriorEntityKey: text(),
  interiorEntityKey: text(),
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
  length: text(),
  width: text(),
});

const ResidenceSpecsAttributes = pgTable("residence_specs_attributes", {
  id: serial().primaryKey(),
  homeDocId: integer()
    .references(() => HomeDocs.id, {
      onDelete: "cascade",
    })
    .unique(),
  area: text(),
  subEntitiesQuantity: text(),
  constructionYear: text(),
});

const ChattelsSpecsAttributes = pgTable("chattels_specs_attributes", {
  id: serial().primaryKey(),
  homeDocId: integer()
    .references(() => HomeDocs.id, {
      onDelete: "cascade",
    })
    .unique(),
  colors: text(),
  quantity: text(),
  weight: text(),
});

export {
  HomeDocs,
  HomeDocsDimensions,
  HomeDocsRelations,
  ResidenceSpecsAttributes,
  ChattelsSpecsAttributes,
  CategoriesEnum,
  TypesEnum,
};
