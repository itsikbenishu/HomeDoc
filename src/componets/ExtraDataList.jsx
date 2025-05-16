import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import {
  Grid,
  Typography,
  TextField,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { toItemsWithIds, toItemWithId } from "../utils/appTools";
import { useFormikContext } from "formik";
import { useIsEditMode } from "../hooks/useIsEditMode";
import ExtraDataListDialog from "./ExtraDataListDialog";
import { useTranslation } from "react-i18next";
import { useInputDirection } from "../hooks/useInputDirection";

const useStyles = makeStyles(() => ({
  typographyText: {
    color: "#130b65",
  },
  textField: {
    marginBottom: 2,
    width: "100%",
    height: "1.5rem",
    "& .MuiInputBase-root": {
      height: "1.9rem",
    },
  },
  extraDataListContainer: {
    height: "100%",
    position: "relative",
    paddingBottom: 10,
    paddingTop: 5,
  },
  textFieldContainer: {
    marginBottom: 0,
  },
  moreIconContainer: {
    position: "absolute",
    top: 0,
    marginTop: 5,
    marginRight: 5,
  },
}));

const ExtraDataList = ({ count = 0 }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { values, errors, setFieldValue, validateField } = useFormikContext();
  const isEditMode = useIsEditMode();
  const inputDirection = useInputDirection();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const init = () => toItemsWithIds(values.extraData);
  const [elements, setElements] = useState(init);
  const [newCharacteristic, setNewCharacteristic] = useState("");
  const [newValue, setNewValaue] = useState("");
  const elementsByCount = elements.slice(0, count);
  const editOpacity = { opacity: isEditMode ? 1 : 0 };

  const handleAdd = () => {
    if (newCharacteristic || newValue) {
      const newItem = toItemWithId({
        characteristic: newCharacteristic,
        value: newValue,
      });
      const updated = [newItem, ...elements];
      setElements(updated);
      setFieldValue(
        "extraData",
        updated.map(({ characteristic, value }) => ({ characteristic, value }))
      );
      validateField("extraData");
      setNewCharacteristic("");
      setNewValaue("");
    }
  };

  const handleRemove = (elem) => {
    const updated = elements.filter((e) => e.id !== elem.id);
    setElements(updated);
    setFieldValue(
      "extraData",
      updated.map(({ characteristic, value }) => ({ characteristic, value }))
    );
    validateField("extraData");
  };

  const handleChange = ({ target }, index) => {
    const { name, value } = target;
    const updated = [...elements];
    updated[index] = { ...updated[index], [name]: value };
    setElements(updated);
  };

  const handleBlur = ({ target }, index) => {
    const { name, value } = target;
    const updated = [...elements];
    updated[index] = { ...updated[index], [name]: value };
    setElements(updated);
    setFieldValue(
      "extraData",
      updated.map(({ characteristic, value }) => ({ characteristic, value }))
    );
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.extraDataListContainer}
    >
      <Grid
        item
        className={classes.moreIconContainer}
        sx={{
          left: i18n.language === "he" ? 0 : "auto",
          right: i18n.language === "he" ? "auto" : 0,
        }}
      >
        {elementsByCount.length > 0 && (
          <ExtraDataListDialog
            extraDataList={elements}
            handleRemove={handleRemove}
          />
        )}
      </Grid>

      {isMobile && (
        <Grid item sx={{ mb: 0.2 }}>
          <Typography variant="subtitle1" className={classes.typographyText}>
            {t("extra_data_list.additional")}
          </Typography>
        </Grid>
      )}

      <Grid container spacing={1.5} alignItems="center">
        {!isMobile && (
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" className={classes.typographyText}>
              {t("extra_data_list.additional")}
            </Typography>
          </Grid>
        )}
        <Grid item xs sm={4}>
          <TextField
            autoComplete="off"
            onChange={(e) => setNewCharacteristic(e.target.value)}
            value={newCharacteristic}
            variant="outlined"
            placeholder={t("extra_data_list.characteristic_name")}
            className={classes.textField}
            disabled={!isEditMode}
            fullWidth
            dir={inputDirection(newCharacteristic)}
            sx={editOpacity}
          />
        </Grid>
        <Grid item xs sm={4}>
          <TextField
            autoComplete="off"
            onChange={(e) => setNewValaue(e.target.value)}
            value={newValue}
            variant="outlined"
            placeholder={t("extra_data_list.value")}
            className={classes.textField}
            disabled={!isEditMode}
            fullWidth
            dir={inputDirection(newValue)}
            sx={editOpacity}
          />
        </Grid>
        <Grid item xs="auto" sx={{ display: "flex", alignItems: "center" }}>
          {isEditMode && (
            <Tooltip title={t("extra_data_list.add")} placement="bottom">
              <AddBoxRoundedIcon
                onClick={handleAdd}
                fontSize="small"
                sx={{ verticalAlign: "middle" }}
              />
            </Tooltip>
          )}
        </Grid>
      </Grid>

      {elementsByCount.map((elem, index) => (
        <Grid
          container
          key={elem.id}
          spacing={1.5}
          sx={{ mt: index === 0 ? 0.2 : 0.1 }}
          alignItems="center"
        >
          {!isMobile && <Grid item xs={12} sm={2} />}
          <Grid item xs sm={4}>
            <Tooltip
              title={errors?.extraData?.[index]?.characteristic || ""}
              open={!!errors?.extraData?.[index]?.characteristic}
              arrow
            >
              <TextField
                autoComplete="off"
                variant="outlined"
                name="characteristic"
                value={elem.characteristic}
                onChange={(e) => handleChange(e, index)}
                onBlur={(e) => handleBlur(e, index)}
                disabled={!isEditMode}
                className={classes.textField}
                error={!!errors?.extraData?.[index]?.characteristic}
                dir={inputDirection(elem.characteristic)}
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs sm={4}>
            <Tooltip
              title={errors?.extraData?.[index]?.value || ""}
              open={!!errors?.extraData?.[index]?.value}
              arrow
            >
              <TextField
                autoComplete="off"
                variant="outlined"
                name="value"
                value={elem.value}
                onChange={(e) => handleChange(e, index)}
                onBlur={(e) => handleBlur(e, index)}
                disabled={!isEditMode}
                className={classes.textField}
                error={!!errors?.extraData?.[index]?.value}
                dir={inputDirection(elem.value)}
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid item xs="auto">
            {isEditMode && (
              <Tooltip title={t("extra_data_list.remove")} placement="bottom">
                <DeleteIcon
                  onClick={() => handleRemove(elem)}
                  fontSize="small"
                  sx={{ verticalAlign: "middle" }}
                />
              </Tooltip>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExtraDataList;
