import { Card, Stack, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  card: {
    width: "100%",
    minHeight: "2.5rem",
    overflowX: "auto",
  },
  box: {
    flexBasis: 0,
    textAlign: "center",
    color: "#430494",
    fontSize: "1.05rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const SearchResultsLine = ({
  item,
  idName = "id",
  fields = [],
  columnRatios = [],
  rowIndex,
  isLinkable = false,
  linkPath = "",
}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { i18n } = useTranslation();

  return (
    <Card
      className={classes.card}
      sx={{
        px: 1,
        my: 0.5,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {fields.map((field, index) => (
          <Box
            key={`${item[idName]}-${field}`}
            className={classes.box}
            sx={{
              flexGrow: columnRatios[index] ?? 1,
            }}
          >
            {field === "#" ? rowIndex : item[field]}
          </Box>
        ))}
        {isLinkable && (
          <IconButton
            onClick={() => navigate(`${linkPath}/${item[idName]}`)}
            sx={{ flexShrink: 0 }}
          >
            {i18n.language === "he" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};

export default SearchResultsLine;
