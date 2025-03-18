import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@mui/material";
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
import { HOME_DOC_CATEGORIES } from "../Constants";
import HeaderPage from "../componets/HeaderPage";

const useStyles = makeStyles(() => ({
  header: {
    margin: 4,
  },
  resultsCard: {
    background: "#130b65",
    margin: 4,
  },
}));

const SearchResultsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const homeDocs = useSelector(selectHomeDocResults).map((home) => {
    return { ...home, category: HOME_DOC_CATEGORIES[home.category] };
  });
  const homeDocsStats = useSelector(selectHomeDocStats);
  const headers = ["#", "סוג נכס", "כתובת"];
  const homefields = ["#", "category", "interiorEntityKey"];

  useEffect(() => {
    const seachQuery =
      location.search === ""
        ? location.search + `type='PROPERTY'`
        : location.search + `&type='PROPERTY'`;
    dispatch(searchHomeDocs({ query: seachQuery }));
    const message = new URLSearchParams(location.search).get(
      "interiorEntityKey"
    );
    dispatch(
      fetchHomeDocStats({
        interiorEntityKey: message,
      })
    );
  }, [location, dispatch]);

  const category = new URLSearchParams(location.search).get("category");

  const categoryIndex =
    homeDocsStats?.categoryStats &&
    homeDocsStats?.categoryStats.findIndex(
      (stat) => `'${stat.category}'` === category
    );

  const checkCategory = location.search.search("category") === -1;
  const checkMessage = location.search.search("interiorEntityKey") === -1;

  const paginationCount =
    homeDocsStats === null || homeDocsStats?.categoryStats === null
      ? 0
      : checkCategory && checkMessage
        ? homeDocsStats.totalCount
        : homeDocsStats.categoryStats[categoryIndex]?.countHomes ||
          homeDocsStats.totalCount;

  return (
    <>
      <Stack spacing={1} style={{ borderStyle: "none" }}>
        <HeaderPage headerName="חיפוש נכס" cardClass={classes.header} />
        <Card>
          <SearchPropertyForm initialCategory={category}></SearchPropertyForm>
        </Card>
        <Card className={classes.resultsCard}>
          <SearchResults
            headers={headers}
            results={homeDocs}
            fields={homefields}
            paginationCount={paginationCount}
            isLinkable={true}
            linkPath={"Residence"}
          ></SearchResults>
        </Card>
      </Stack>
    </>
  );
};

export default SearchResultsPage;
