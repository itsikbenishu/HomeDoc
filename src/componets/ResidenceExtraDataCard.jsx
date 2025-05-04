import { Box, Grid, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SUB_HOME_DOC_LIST, SUB_HOME_DOC_TYPE } from "../../Constants";
import ExtraDataList from "./ExtraDataList";
import ExtraDataField from "./ExtraDataField";

const useStyles = makeStyles(() => ({
  gridItem: {
    alignItems: "stretch",
    width: "100%",
  },
  Box: {
    height: "100%",
    display: "flex",
    marginLeft: "0.25rem",
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
}));

const ResidenceExtraDataCard = ({ residence }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} direction="column" sx={{ mb: -10 }}>
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box
          className={classes.Box}
          sx={{
            bgcolor: "transparent",
          }}
        >
          <Card
            className={classes.card}
            sx={{
              bgcolor: "transparent",
              mt: 0.25,
              mr: 0.25,
            }}
          >
            <Grid container spacing={0.25}>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                sx={{ pl: 0.5 }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.typographyText}
                >
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
        </Box>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box
          className={classes.Box}
          sx={{
            bgcolor: "transparent",
            mr: 0.25,
          }}
        >
          <Card className={classes.card} sx={{ bgcolor: "transparent" }}>
            <Grid container spacing={0.25}>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                sx={{ pl: 0.5 }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.typographyText}
                >
                  {!SUB_HOME_DOC_LIST[
                    SUB_HOME_DOC_TYPE[residence.category][residence.type]
                  ]
                    ? `כמות הפריטים:`
                    : `כמות ה${
                        SUB_HOME_DOC_LIST[
                          SUB_HOME_DOC_TYPE[residence.category][residence.type]
                        ]
                      }:`}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.textFieldContainer}>
                <ExtraDataField
                  label="subEntitiesQuantity"
                  className={classes.textField}
                />
              </Grid>
              <Grid
                item
                xs={1}
                container
                justifyContent="flex-start"
                alignItems="center"
                sx={{ pl: 0.5 }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.typographyText}
                >
                  שנת בנייה:
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.textFieldContainer}>
                <ExtraDataField
                  label="constructionYear"
                  className={classes.textField}
                />
              </Grid>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                sx={{ pl: 0.5 }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.typographyText}
                >
                  שטח (קמ"ר):
                </Typography>
              </Grid>
              <Grid item xs={1} className={classes.textFieldContainer}>
                <ExtraDataField label="area" className={classes.textField} />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>

      {residence.type !== "PROPERTY" && (
        <Grid item xs={12} sm={3} className={classes.gridItem}>
          <Box
            className={classes.Box}
            sx={{
              bgcolor: "transparent",
              mr: 0.25,
            }}
          >
            <Card className={classes.card} sx={{ bgcolor: "transparent" }}>
              <Grid container spacing={0.25}>
                <Grid
                  item
                  xs={2}
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ pl: 0.5 }}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyText}
                  >
                    רוחב (מטרים):
                  </Typography>
                </Grid>
                <Grid item xs={2} className={classes.textFieldContainer}>
                  <ExtraDataField label="width" className={classes.textField} />
                </Grid>
                <Grid
                  item
                  xs={2}
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{ pl: 0.5 }}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyText}
                  >
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
          </Box>
        </Grid>
      )}
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box
          className={classes.Box}
          sx={{
            mr: 0.25,
            bgcolor: "transparent",
          }}
        >
          <Card
            className={classes.card}
            sx={{
              bgcolor: "transparent",
            }}
          >
            <ExtraDataList
              count={residence.type !== "PROPERTY" ? 3 : 5}
              addMessage="?האם אתה בטוח שהינך מעוניין להוסיף את התכונה הזו"
            />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResidenceExtraDataCard;
