import { Card, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  paper: {
    height: "100%",
    padding: "0.2rem",
    marginTop: "1rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
  card: {
    height: "100%",
    width: "100%",
    padding: "0.2rem",
    margin: "0.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    position: "absolute",
    top: "-1rem",
    right: "0.5rem",
    padding: "0.2rem",
    color: "white",
    fontSize: 14,
  },
}));

const LabeledContainer = ({ lableName, children }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={1}
      className={classes.paper}
      style={{ backgroundColor: "#130b58", paddingTop: "0.1rem" }}
    >
      <div className={classes.label}>
        <Typography variant="body2">{lableName}</Typography>
      </div>
      <Card
        className={classes.card}
        style={{
          backgroundColor: "rgb(205 213 225)",
          borderColor: "rgb(205 213 225)",
        }}
      >
        {children}
      </Card>
    </Paper>
  );
};

export default LabeledContainer;
