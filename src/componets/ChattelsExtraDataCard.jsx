import { Paper, Grid, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExtraDataList from "./ExtraDataList";
import ExtraDataField from "./ExtraDataField";
import ChipsList from "./ChipsList";
import { useFormikContext } from "formik";

const useStyles = makeStyles(() => ({
  gridItem: {
    alignItems: "stretch",
    width: "100%",
  },
  paper: {
    height: "100%",
    display: "flex",
    boxShadow: "none",
    marginLeft: "4px",
  },
  card: {
    padding: "0.75rem",
    marginTop: "-0.5rem",
    marginBottom: "0",
    width: "100%",
  },
  typographyText: {
    color: "#130b65",
  },
  textField: {
    padding: 0.5,
    marginBottom: 2,
    width: "8rem",
    height: "1.5rem",
    "& .MuiInputBase-root": {
      padding: 0,
      height: "1.9rem",
    },
  },
  textFieldContainer: {
    padding: 0,
    marginBottom: 0,
  },
  multilineTextFieldContainer: {
    padding: 0,
    marginTop: -5,
    marginBottom: 5,
  },
  multilineTextField: {
    padding: 0.5,
    marginBottom: 2,
    width: "100%",
    minHeight: "3rem",
    maxHeight: "5rem",
    "& .MuiInputBase-root": {
      padding: 0,
      height: "auto",
      marginTop: "-0.6rem",
      marginBottom: "-0.6rem",
    },
  },
  colorsChips: {
    padding: 0.5,
    marginBottom: 2,
    width: "8rem",
    height: "1.5rem",
    "& .MuiInputBase-root": {
      padding: 0,
      height: "1.9rem",
    },
  },
}));

const ChattelsExtraDataCard = ({ chattels }) => {
  const classes = useStyles();
  const { values, setFieldValue } = useFormikContext();

  return (
    <Grid container spacing={1} direction="column" sx={{ marginBottom: -10 }}>
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            backgroundColor: "transparent",
            borderColor: "grey",
          }}
        >
          <Card
            className={classes.card}
            style={{
              backgroundColor: "transparent",
              borderColor: "grey",
              marginTop: "3px",
              marginRight: "4px",
            }}
          >
            <Grid container spacing={0.25}>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingLeft: "0.5rem" }}
              >
                <Typography variant="h7" className={classes.typographyText}>
                  תיאור:
                </Typography>
              </Grid>
              <Grid
                item
                xs={10}
                className={classes.multilineTextFieldContainer}
              >
                <ExtraDataField
                  label="description"
                  className={classes.multilineTextField}
                  minRows={3}
                  maxRows={5}
                  multiline
                  fullWidth
                  sx={{
                    padding: "6px",
                    "& .MuiInputBase-root": {
                      padding: 0.2,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            backgroundColor: "transparent",
            borderColor: "grey",
            marginRight: "4px",
          }}
        >
          <Card
            className={classes.card}
            style={{ backgroundColor: "transparent", borderColor: "grey" }}
          >
            <Grid container spacing={0.25}>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingLeft: "0.5rem" }}
              >
                <Typography variant="h7" className={classes.typographyText}>
                  כמות הפריטים:
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.textFieldContainer}>
                <ExtraDataField
                  label="quantity"
                  className={classes.textField}
                />
              </Grid>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingLeft: "0.5rem" }}
              >
                <Typography variant="h7" className={classes.typographyText}>
                  משקל (ק"ג):
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.textFieldContainer}>
                <ExtraDataField
                  label="weight"
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            marginRight: "4px",
            backgroundColor: "transparent",
            borderColor: "grey",
          }}
        >
          <Card
            className={classes.card}
            style={{ backgroundColor: "transparent", borderColor: "grey" }}
          >
            <Grid container spacing={0.25}>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingLeft: "0.5rem" }}
              >
                <Typography variant="h7" className={classes.typographyText}>
                  רוחב (מטרים):
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.textFieldContainer}>
                <ExtraDataField
                  label="width"
                  className={classes.textField}
                />
              </Grid>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingLeft: "0.5rem" }}
              >
                <Typography variant="h7" className={classes.typographyText}>
                  אורך (מטרים):
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.textFieldContainer}>
                <ExtraDataField
                  label="length"
                  className={classes.textField}
                />
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            backgroundColor: "transparent",
            borderColor: "grey",
          }}
        >
          <Card
            className={classes.card}
            style={{
              backgroundColor: "transparent",
              borderColor: "grey",
              marginTop: "3px",
              marginRight: "4px",
            }}
          >
            <Grid container spacing={0.25}>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                style={{ paddingLeft: "0.5rem" }}
              >
                <Typography variant="h7" className={classes.typographyText}>
                  צבעים:
                </Typography>
              </Grid>
              <Grid item xs={10} className={classes.textFieldContainer}>
                <ChipsList
                  className={classes.colorsChips}
                  items={values["colors"]}
                  handleChangeChips={(newValue) => {
                    setFieldValue("colors", newValue);
                  }}
                  handleDeleteChip={(deletedValue) => {
                    setFieldValue(
                      "colors",
                      values.colors.filter((value) => value !== deletedValue)
                    );
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                      marginTop: "-12px",
                    },
                    "& .MuiAutocomplete-tag": {
                      marginTop: "-10px",
                      marginRight: 0.1,
                      marginBottom: 0.5,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            marginRight: "4px",
            backgroundColor: "transparent",
            borderColor: "grey",
          }}
        >
          <Card
            className={classes.card}
            style={{
              backgroundColor: "transparent",
              borderColor: "grey",
            }}
          >
            <ExtraDataList
              count={3} //זה טוב עם בניין, מה עושים עם קרקע?
              addMessage="?האם אתה בטוח שהינך מעוניין להוסיף את התכונה הזו"
            />
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChattelsExtraDataCard;
