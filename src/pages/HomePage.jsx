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

import BackgroundImage from "../images/Background_Gemini_Generated_Image.png";
const useStyles = makeStyles(() => ({
  stack: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    textAlign: "center",
    width: "100%",
  },
  categoryCard: {
    width: "12.5rem",
    height: "12.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { HOME_DOC_CATEGORIES } = useTranslatedConstants();
  const classes = useStyles();

  return (
    <Box
      sx={{
        height: { xs: "100%", sm: "90vh" },
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Stack
        spacing={5}
        className={classes.stack}
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.3)",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: "transparent",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            className={classes.header}
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
              textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {t("home_page.title")}
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            bgcolor: "transparent",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
            }}
          >
            {Object.entries(HOME_DOC_CATEGORIES).map(
              ([category, categoryText]) => (
                <Card
                  key={category}
                  className={classes.categoryCard}
                  sx={{
                    p: 1,
                    m: 0.5,
                    border: "none",
                    textAlign: "center",
                    bgcolor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(5px)",
                    boxShadow: (theme) => theme.shadows[3],
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: { md: "scale(1.05)" },
                      boxShadow: (theme) => theme.shadows[6],
                    },
                  }}
                  onClick={() =>
                    navigate(
                      `/Results?category=${category}&${BASIC_PAGINATION}`
                    )
                  }
                >
                  <CardContent
                    sx={{
                      fontSize: "1.8rem",
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    {categoryText}
                  </CardContent>
                </Card>
              )
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default HomePage;
