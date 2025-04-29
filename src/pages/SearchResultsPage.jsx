import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // הוספת useSearchParams
import { useDispatch, useSelector } from "react-redux";
import { Box, Card } from "@mui/material";
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
import { HOME_DOC_CATEGORIES } from "../../Constants";
import HeaderPage from "../componets/HeaderPage";

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
  const [searchParams] = useSearchParams();

  const homeDocs = useSelector(selectHomeDocResults).map((home) => {
    return { ...home, category: HOME_DOC_CATEGORIES[home.category] };
  });
  const homeDocsStats = useSelector(selectHomeDocStats);
  const headers = ["#", "סוג נכס", "כתובת"];
  const homefields = ["#", "category", "interiorEntityKey"];
  const divfields = [1, 1, 8];

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    const message = newSearchParams.get("interiorEntityKey")?.trim();
    if (message) {
      newSearchParams.delete("interiorEntityKey");
      newSearchParams.set("interiorEntityKey[$ILIKE]", message);
    }

    if (!newSearchParams.has("type")) {
      newSearchParams.set("type", "'PROPERTY'");
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
      (stat) => `'${stat.category}'` === category
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
          borderStyle: "none",
        }}
      >
        <HeaderPage headerName="חיפוש נכס" cardClass={classes.header} />
        <Box>
          <SearchPropertyForm initialCategory={category}></SearchPropertyForm>
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
