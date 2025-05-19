import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/material";
import SearchResults from "../componets/SearchResults";
import SearchPropertyForm from "../componets/SearchPropertyForm";
import {
  selectHomeDocResults,
  searchHomeDocs,
  selectHomeDocStats,
  fetchHomeDocStats,
} from "../slices/HomeDocSlice";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import HeaderPage from "../componets/HeaderPage";

import BackgroundImage from "./Background_Gemini_Generated_Image.png";

const useStyles = makeStyles(() => ({
  header: {
    margin: 4,
  },
  resultsCard: {
    margin: 4,
  },
}));

const SearchResultsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { HOME_DOC_CATEGORIES } = useTranslatedConstants();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const homeDocs = useSelector(selectHomeDocResults).map((home) => {
    return { ...home, category: HOME_DOC_CATEGORIES[home.category] };
  });
  const homeDocsStats = useSelector(selectHomeDocStats);
  const headers = isMobile
    ? []
    : [
        "#",
        t("search_homedoc_page.header_type"),
        t("search_homedoc_page.header_address"),
      ];
  const homefields = isMobile
    ? ["interiorEntityKey"]
    : ["#", "category", "interiorEntityKey"];
  const divfields = isMobile ? [10] : [0.5, 2, 9.5];

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    const message = newSearchParams.get("interiorEntityKey")?.trim();
    if (message) {
      newSearchParams.delete("interiorEntityKey");
      newSearchParams.set("interiorEntityKey[$ILIKE]", message);
    }

    if (!newSearchParams.has("type")) {
      newSearchParams.set("type", "PROPERTY");
    }

    const searchQuery = `?${newSearchParams.toString()}`;

    dispatch(searchHomeDocs({ query: searchQuery }));

    dispatch(
      fetchHomeDocStats({
        interiorEntityKey: message,
      })
    );
  }, [searchParams, dispatch]);

  const category = searchParams.get("category");

  const categoryIndex =
    homeDocsStats?.categoryStats &&
    category &&
    homeDocsStats?.categoryStats.findIndex(
      (stat) => `${stat.category}` === category
    );

  const checkCategory = !searchParams.has("category");
  const checkMessage = !searchParams.has("interiorEntityKey");

  const paginationCount =
    homeDocsStats === null ||
    homeDocsStats?.categoryStats === null ||
    categoryIndex === -1
      ? 0
      : checkCategory && checkMessage
      ? homeDocsStats.totalCount
      : homeDocsStats.categoryStats[categoryIndex]?.countHomes ||
        homeDocsStats.totalCount;

  return (
    <>
      <Stack
        spacing={1}
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <HeaderPage
          headerName={t("search_homedoc_page.header")}
          cardClass={classes.header}
        />
        <Box>
          <SearchPropertyForm initialCategory={category} />
        </Box>
        <Box>
          <SearchResults
            headers={headers}
            results={homeDocs}
            fields={homefields}
            columnRatios={divfields}
            paginationCount={paginationCount}
            isLinkable={true}
            linkPath={"Residence"}
          />
        </Box>
      </Stack>
    </>
  );
};

export default SearchResultsPage;
