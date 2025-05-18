import { useNavigate } from "react-router-dom";
import {
  Paper,
  Box,
  Card,
  Typography,
  Stack,
  CardContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BASIC_PAGINATION } from "../../Constants";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({
  header: {
    textAlign: "center",
    width: "100%",
  },
  box: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 2 },
  categoryCard: {
    padding: 1,
    textAlign: "center",
    margin: 4,
    width: "12.5rem",
    height: "12.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
  categoryCardContent: {
    fontSize: "2rem",
    "&:hover": {
      color: "burlywood",
      borderBottom: "1px solid white",
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { HOME_DOC_CATEGORIES } = useTranslatedConstants();

  return (
    <Stack
      spacing={5}
      sx={{
        bgcolor: (theme) => theme.palette.primary.main,
        pl: { xs: 2, sm: 4 },
        pr: { xs: 2, sm: 4 },
        mt: 1,
        p: 1,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
          }}
          className={classes.header}
        >
          {t("home_page.title")}
        </Typography>
      </Paper>

      <Paper
        elevation={0}
        sx={{ bgcolor: (theme) => theme.palette.primary.main }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {Object.entries(HOME_DOC_CATEGORIES).map(
            ([category, categoryText]) => (
              <Card
                key={category}
                className={classes.categoryCard}
                onClick={() =>
                  navigate(`/Results?category=${category}&${BASIC_PAGINATION}`)
                }
              >
                <CardContent className={classes.categoryCardContent}>
                  {categoryText}
                </CardContent>
              </Card>
            )
          )}
        </Box>
      </Paper>
    </Stack>
  );
};

export default HomePage;
