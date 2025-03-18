import { useNavigate } from "react-router-dom";
import { Paper, Card, Typography, Grid, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BASIC_PAGINATION,HOME_DOC_CATEGORIES } from "../Constants";

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
    overflow: "hidden",
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
    <>
      <Grid
        container
        direction="column"
        spacing={5}
        style={{ background: "#130b65" }}
        sx={{ ml: "4rem", mr: "4rem", mt: "1rem", p: "1rem" }}
        alignItems="center"
      >
        <Grid item xs={12} elevation={0}>
          <Card elevation={0}>
            <Typography
              elevation={0}
              variant="h4"
              style={{ background: "#130b65", color: "white" }}
              className={classes.header}
            >
              בחר סוג נכס
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} style={{ background: "#130b65" }}>
            <Grid
              container
              spacing={2}
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {Object.entries(HOME_DOC_CATEGORIES).map(
                ([category, categoryText]) => (
                  <Grid item xs={4} key={category}>
                    <Card
                      className={classes.categoryCard}
                      key={category}
                      onClick={() =>
                        navigate(
                          `/Results?category='${category}'&${BASIC_PAGINATION}`
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
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
