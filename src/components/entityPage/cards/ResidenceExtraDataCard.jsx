import { useTranslation } from "react-i18next";
import { useEffect } from "react";
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
import { SUB_HOME_DOC_TYPE } from "../../../../Constants";
import { useTranslatedConstants } from "../../../hooks/useTranslatedConstants";
import ExtraDataList from "../forms/ExtraDataList";
import ExtraDataField from "../forms/ExtraDataField";
import LabeledExtraDataFields from "../forms/LabeledExtraDataFields";

const useStyles = makeStyles(() => ({
  gridItem: {
    alignItems: "stretch",
    width: "100%",
  },
  box: {
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
  textField: {
    padding: 0.5,
    marginBottom: 3,
    maxWidth: "8rem",
    height: "1.5rem",
    "& .MuiInputBase-root": {
      padding: 0,
      height: "1.9rem",
    },
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { validateForm } = useFormikContext();
  const { t, i18n } = useTranslation();
  const { SUB_HOME_DOC_LIST } = useTranslatedConstants();

  useEffect(() => {
    validateForm();
  }, [i18n.language, validateForm]);

  const docTypeKey = SUB_HOME_DOC_TYPE[residence.category]?.[residence.type];
  const subEntityName = SUB_HOME_DOC_LIST[docTypeKey];

  const subEntitiesQuantityLabel = subEntityName
    ? t("residence_cards.label_sub_entities_quantity", {
        entity: subEntityName.toLowerCase(),
      })
    : t("residence_cards.label_items_quantity");

  return (
    <Grid container spacing={1} direction="column">
      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box className={classes.box} sx={{ bgcolor: "transparent" }}>
          <Card
            className={classes.card}
            sx={{ bgcolor: "transparent", mt: 0.25, mr: 0.25 }}
          >
            <Grid container spacing={0.25}>
              <Grid
                item
                xs="auto"
                sm={2}
                justifyContent="flex-start"
                alignItems="center"
                sx={{ pl: 0.5 }}
              >
                <Typography variant="subtitle1">
                  {t("residence_cards.label_description")}
                </Typography>
              </Grid>
              <Grid item xs className={classes.multilineTextFieldContainer}>
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
                  text: subEntitiesQuantityLabel,
                  formik: "subEntitiesQuantity",
                },
                {
                  text: t("residence_cards.label_construction_year"),
                  formik: "constructionYear",
                },
                {
                  text: t("residence_cards.label_area"),
                  formik: "area",
                },
              ]}
            />
          </Card>
        </Box>
      </Grid>

      {residence.type !== "PROPERTY" && (
        <Grid item xs={12} sm={3} className={classes.gridItem}>
          <Box
            className={classes.box}
            sx={{ bgcolor: "transparent", mr: 0.25 }}
          >
            <Card className={classes.card} sx={{ bgcolor: "transparent" }}>
              <LabeledExtraDataFields
                className={classes.textField}
                columnsPerRow={3}
                labels={[
                  {
                    text: t("residence_cards.label_length"),
                    formik: "length",
                  },
                  {
                    text: t("residence_cards.label_width"),
                    formik: "width",
                  },
                ]}
              />
            </Card>
          </Box>
        </Grid>
      )}

      <Grid item xs={12} sm={3} className={classes.gridItem}>
        <Box className={classes.box} sx={{ mr: 0.25, bgcolor: "transparent" }}>
          <Card
            className={classes.card}
            sx={{ bgcolor: "transparent", height: "100%" }}
          >
            <ExtraDataList
              count={isMobile ? 1 : residence.type !== "PROPERTY" ? 3 : 5}
              addMessage={t("residence_cards.confirm_add_property")}
            />
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResidenceExtraDataCard;
