import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Paper,
  Card,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { Stack, TablePagination } from "@mui/material";
import SearchResultsLine from "./SearchResultsLine";

const SearchResults = ({
  headers,
  results,
  fields,
  idName = "id",
  paginationCount = 0,
  isLinkable = false,
  linkPath = "",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const resultsTilte = " תוצאות: ";
  let paramsForQueryObj = location.search;
  const theme = createTheme({
    direction: "rtl",
  });

  const urlPage = new URLSearchParams(paramsForQueryObj).get("page") || 1;
  const urlLimit = new URLSearchParams(paramsForQueryObj).get("limit") || 10;

  const [page, setPage] = useState(1 * urlPage - 1);
  const [rowsPerPage, setRowsPerPage] = useState(Math.min(1 * urlLimit, 100));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    paramsForQueryObj = paramsForQueryObj.replace(
      `page=${page + 1}`,
      `page=${newPage + 1}`
    );
    navigate(paramsForQueryObj);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(1 * event.target.value);
    paramsForQueryObj = paramsForQueryObj.replace(
      `limit=${rowsPerPage}`,
      `limit=${event.target.value}`
    );
    setPage(0);
    paramsForQueryObj = paramsForQueryObj.replace(`page=${page + 1}`, `page=1`);

    navigate(paramsForQueryObj);
  };

  return (
    <>
      <Paper
        elevation={12}
        style={{
          alignItems: "center",
          backgroundColor: "rgb(205 213 225)",
          marginLeft: "1.5rem",
          marginRight: "1.5rem",
          paddingTop: "1.5rem",
          paddingBottom: "1rem",
        }}
      >
        <Stack
          spacing={2}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            elevation={0}
            style={{
              backgroundColor: "rgb(205 213 225)",
              borderColor: "rgb(205 213 225)",
              width: "85rem",
              height: "2.5rem",
            }}
          >
            <Typography variant="h4" id="resultsTilte">
              {resultsTilte}
            </Typography>
          </Card>
          <Card
            variant="elevation"
            elevation={24}
            style={{
              backgroundColor: "burlywood",
              width: "85rem",
              height: "2.5rem",
            }}
            square
          >
            <Stack direction="row">
              <>
                {headers.map((header, index) => (
                  <div
                    key={index}
                    style={{
                      width: `${85 / fields.length}rem`,
                      height: "2.5rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#430494",
                      fontSize: "1.2rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </div>
                ))}
                {!isLinkable && (
                  <div
                    sx={{
                      width: `2.5rem`,
                    }}
                  ></div>
                )}
              </>
            </Stack>
          </Card>
          <>
            {results.map((item, index) => (
              <SearchResultsLine
                key={item[idName]}
                item={item}
                fields={fields}
                idName={idName}
                rowIndex={index + 1}
                isLinkable={isLinkable}
                linkPath={linkPath}
              />
            ))}
          </>
          <>
            <ThemeProvider theme={theme}>
              <TablePagination
                component="div"
                count={parseInt(paginationCount)}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={""}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} מתוך ${count !== -1 ? count : `יותר מ ${to}`}`
                }
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </ThemeProvider>
          </>
        </Stack>
      </Paper>
    </>
  );
};

export default SearchResults;
