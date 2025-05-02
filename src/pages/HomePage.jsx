import { useNavigate } from "react-router-dom";
import {
  Paper,
  Card,
  Typography,
  Stack,
  Grid,
  CardContent,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BASIC_PAGINATION, HOME_DOC_CATEGORIES } from "../../Constants";

const useStyles = makeStyles(() => ({
  header: {
    textAlign: "center",
    width: "100%",
  },
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
    fontSize: "2.25rem",
    "&:hover": {
      color: "burlywood",
      borderBottom: "1px solid white",
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Stack
      spacing={5}
      sx={{
        bgcolor: (theme) => theme.palette.primary.main,
        ml: "4rem",
        mr: "4rem",
        mt: "1rem",
        p: "1rem",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          bgcolor: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        }}
        className={classes.header}
      >
        בחר סוג נכס
      </Typography>

      <Paper
        elevation={0}
        sx={{ bgcolor: (theme) => theme.palette.primary.main }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Object.entries(HOME_DOC_CATEGORIES).map(
            ([category, categoryText]) => (
              <Grid item xs={12} sm={6} md={4} key={category}>
                <Card
                  className={classes.categoryCard}
                  onClick={() =>
                    navigate(
                      `/Results?category=${category}&${BASIC_PAGINATION}`
                    )
                  }
                >
                  <CardContent className={classes.categoryCardContent}>
                    {categoryText}
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Paper>
    </Stack>
  );
};

export default HomePage;
