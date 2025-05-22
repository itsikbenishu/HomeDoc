import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Paper,
  Card,
  Typography,
  createTheme,
  ThemeProvider,
  Stack,
  TablePagination,
  Box,
} from "@mui/material";
import { STATUSES } from "../../Constants";
import { selectHomeDocStatus } from "../slices/HomeDocSlice";
import SearchResultsLine from "./SearchResultsLine";
import SearchResultsLineSkeleton from "./SearchResultsLineSkeleton";

const SearchResults = ({
  headers,
  results,
  fields,
  columnRatios,
  idName = "id",
  paginationCount = 0,
  isLinkable = false,
  linkPath = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const resultsTitle = t("search_homedoc_page.sub_title");
  let paramsForQueryObj = location.search;
  const paginationTheme = createTheme({
    direction: i18n.language === "he" ? "rtl" : "ltr",
  });
  const homeDocStatus = useSelector(selectHomeDocStatus);

  const isLoading =
    homeDocStatus === STATUSES.IDLE || homeDocStatus === STATUSES.PENDING;

  const urlPage = new URLSearchParams(paramsForQueryObj).get("page") || 1;
  const urlLimit = new URLSearchParams(paramsForQueryObj).get("limit") || 10;

  const [page, setPage] = useState(1 * urlPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(Math.min(1 * urlLimit, 100));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    const params = new URLSearchParams(location.search);
    params.set("page", newPage + 1);
    navigate(`?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value);
    setRowsPerPage(newLimit);
    setPage(0);
    const params = new URLSearchParams(location.search);
    params.set("limit", newLimit);
    params.set("page", 1);
    navigate(`?${params.toString()}`);
  };

  return (
    <Paper
      elevation={12}
      sx={(theme) => ({
        backgroundColor: theme.palette.secondary.main,
        mx: 3,
        px: 2,
      })}
    >
      <Stack spacing={2} alignItems="center">
        <Card
          elevation={0}
          sx={{
            bgcolor: "transparent",
            width: "100%",
            maxWidth: "85rem",
          }}
        >
          <Typography variant="h4">{resultsTitle}</Typography>
        </Card>

        {headers.length > 0 && (
          <Card
            elevation={24}
            square
            sx={{
              backgroundColor: "burlywood",
              width: "100%",
              minHeight: "2.5rem",
              overflowX: "auto",
            }}
          >
            <Stack direction="row" alignItems="center">
              {headers.map((header, index) => (
                <Box
                  key={`header-${index}`}
                  sx={{
                    pt: 0.5,
                    flexGrow: columnRatios[index],
                    flexBasis: 0,
                    textAlign: "center",
                    fontSize: "1.2rem",
                    color: "#430494",
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
                </Box>
              ))}
              {isLinkable && <Box sx={{ flexShrink: 0, width: "2.5rem" }} />}
            </Stack>
          </Card>
        )}

        {isLoading
          ? Array.from({ length: rowsPerPage }).map((_, index) => (
              <SearchResultsLineSkeleton
                key={`Skeleton-line-${index}`}
                columns={3}
                columnRatios={columnRatios}
              />
            ))
          : results
              .slice(0, rowsPerPage)
              .map((item, index) => (
                <SearchResultsLine
                  key={item[idName]}
                  item={item}
                  fields={fields}
                  columnRatios={columnRatios}
                  idName={idName}
                  rowIndex={index + 1}
                  isLinkable={isLinkable}
                  linkPath={linkPath}
                />
              ))}
        <ThemeProvider theme={paginationTheme}>
          <TablePagination
            component="div"
            count={parseInt(paginationCount)}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage=""
            labelDisplayedRows={({ from, to, count }) =>
              t("table_pagination.label_displayed_rows", {
                from,
                to,
                count:
                  count !== -1
                    ? count
                    : t("table_pagination.more_than", { to }),
              })
            }
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ThemeProvider>
      </Stack>
    </Paper>
  );
};

export default SearchResults;
