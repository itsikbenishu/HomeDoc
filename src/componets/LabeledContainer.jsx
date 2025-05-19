import { Card, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  Box: {
    height: "calc(100% - 0.5rem)",
    padding: "0.2rem",
    marginTop: "0.5rem",
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

const LabeledContainer = ({ labelName, children }) => {
  const classes = useStyles();

  return (
    <Box elevation={1} className={classes.Box} sx={{ bgcolor: "transparent" }}>
      <div className={classes.label}>
        <Typography
          variant="body2"
          sx={{ color: (theme) => theme.palette.primary.contrastText }}
        >
          {labelName}
        </Typography>
      </div>
      <Card
        className={classes.card}
        sx={{
          bgcolor: (theme) => theme.palette.secondary.main,
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default LabeledContainer;
