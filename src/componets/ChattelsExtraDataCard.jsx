import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import {
  Box,
  Grid,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ExtraDataList from "./ExtraDataList";
import ExtraDataField from "./ExtraDataField";
import ChipsList from "./ChipsList";
import LabeledExtraDataFields from "./LabeledExtraDataFields";

const useStyles = makeStyles(() => ({
  gridItem: {
    alignItems: "stretch",
    width: "100%",
  },
  box: {
    height: "100%",
    display: "flex",
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

const ChattelsExtraDataCard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { values, setFieldValue, validateForm } = useFormikContext();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    validateForm();
  }, [i18n.language, validateForm]);

  return (
    <Grid container spacing={1} direction="column">
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box className={classes.box} sx={{ bgcolor: "transparent" }}>
          <Card
            className={classes.card}
            sx={{ bgcolor: "transparent", mt: "3px", mr: 0.25 }}
          >
            <Grid container spacing={0.25}>
              <Grid
                item
                xs={2}
                justifyContent="flex-start"
                alignItems="center"
                sx={{ pl: 2 }}
              >
                <Typography
                  variant="subtitle1"
                  className={classes.typographyText}
                >
                  {t("chattels_cards.chip_list_error_message", {
                    chip: t("chattels_cards.chip_color"),
                  })}
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
                  maxRows={3}
                  multiline
                  fullWidth
                  sx={{
                    p: "6px",
                    "& .MuiInputBase-root": {
                      p: 0.2,
                      "& textarea": {
                        scrollbarColor: `${theme.palette.grey[500]} ${theme.palette.secondary.main}`,
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box className={classes.box} sx={{ bgcolor: "transparent", mr: 0.25 }}>
          <Card className={classes.card} sx={{ bgcolor: "transparent" }}>
            <LabeledExtraDataFields
              className={classes.textField}
              columnsPerRow={3}
              labels={[
                {
                  text: t("chattels_cards.label_quantity"),
                  formik: "quantity",
                },
                {
                  text: t("chattels_cards.label_weight"),
                  formik: "weight",
                },
              ]}
            />
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box
          className={classes.box}
          sx={{ mr: 0.25, backgroundColor: "transparent" }}
        >
          <Card
            className={classes.card}
            sx={{ backgroundColor: "transparent" }}
          >
            <LabeledExtraDataFields
              className={classes.textField}
              columnsPerRow={3}
              labels={[
                {
                  text: t("chattels_cards.label_length"),
                  formik: "length",
                },
                {
                  text: t("chattels_cards.label_width"),
                  formik: "width",
                },
              ]}
            />
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box className={classes.box} sx={{ backgroundColor: "transparent" }}>
          <Card
            className={classes.card}
            sx={{ backgroundColor: "transparent", mt: "3px", mr: 0.25 }}
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
                  {t("chattels_cards.label_colors")}
                </Typography>
              </Grid>
              <Grid item xs={10} className={classes.textFieldContainer}>
                <ChipsList
                  className={classes.colorsChips}
                  currentChips={values["colors"]}
                  firstChipsNumber={isMobile ? 1 : 4}
                  addAfterBlur={isMobile}
                  errorMessage={t("chattels_cards.confirm_add_property")}
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
                      mt: -1.5,
                    },
                    "& .MuiAutocomplete-tag": {
                      mt: -1,
                      mr: 0.1,
                      mb: 0.5,
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
          className={classes.box}
          sx={{ mr: 0.25, backgroundColor: "transparent" }}
        >
          <Card
            className={classes.card}
            sx={{ backgroundColor: "transparent" }}
          >
            <ExtraDataList
              count={isMobile ? 2 : 3}
              addMessage={t("chattels_cards.confirm_add_property")}
            />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChattelsExtraDataCard;
