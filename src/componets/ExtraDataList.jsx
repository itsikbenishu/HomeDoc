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
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import ExtraDataListDialog from "./ExtraDataListDialog";
import { toItemsWithIds, toItemWithId } from "../utils/appTools";
import { useFormikContext } from "formik";
import { useIsEditMode } from "../hooks/useIsEditMode";

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
    left: 0,
    marginTop: 5,
    marginRight: 5,
  },
}));

const ExtraDataList = ({ count = 0 }) => {
  const classes = useStyles();
  const { values, errors, setFieldValue, validateField } = useFormikContext();
  const isEditMode = useIsEditMode();
  const editOpacity = { opacity: isEditMode ? 1 : 0 };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dataListWithIds = toItemsWithIds(values.extraData);
  const [elements, setElements] = useState(dataListWithIds);
  const [newCharacteristic, setNewCharacteristic] = useState("");
  const [newValue, setNewValaue] = useState("");
  const elementsByCount = elements.slice(0, count);

  useEffect(() => {
    if (!isEditMode && !isEqual(elements, dataListWithIds)) {
      setElements([...dataListWithIds]);
    }
  }, [isEditMode, dataListWithIds, elements]);

  const handleAdd = () => {
    if (newCharacteristic || newValue) {
      setElements([
        toItemWithId({ characteristic: newCharacteristic, value: newValue }),
        ...elements,
      ]);
      setFieldValue("extraData", [
        { characteristic: newCharacteristic, value: newValue },
        ...values.extraData,
      ]);
      validateField("extraData");

      setNewCharacteristic("");
      setNewValaue("");
    }
  };

  const handleRemove = (elem) => {
    const newElements = elements.filter((e) => e.id !== elem.id);

    setElements(newElements);

    setFieldValue(
      "extraData",
      newElements.map((e) => {
        return { characteristic: e.characteristic, value: e.value };
      })
    );
    validateField("extraData");
  };

  const handleChange = ({ target }, index) => {
    const { name, value } = target;
    const updatedElements = [...elements];
    updatedElements.splice(index, 1, {
      ...updatedElements[index],
      [name]: value,
    });

    setElements(updatedElements);
  };

  const handleBlur = ({ target }, index) => {
    const { name, value } = target;
    const updatedElements = [...elements];
    updatedElements.splice(index, 1, {
      ...updatedElements[index],
      [name]: value,
    });

    setElements(updatedElements);

    setFieldValue(
      "extraData",
      updatedElements.map((e) => ({
        characteristic: e.characteristic,
        value: e.value,
      }))
    );
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      className={classes.extraDataListContainer}
    >
      <Grid item className={classes.moreIconContainer}>
        <ExtraDataListDialog
          extraDataList={elements}
          handleRemove={handleRemove}
        />
      </Grid>
      {isMobile && (
        <Grid
          item
          // xs={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="subtitle1" className={classes.typographyText}>
            מידע נוסף:
          </Typography>
        </Grid>
      )}
      <Grid container spacing={1.5}>
        {!isMobile && (
          <Grid item xs={2} justifyContent="flex-start" alignItems="center">
            <Typography variant="subtitle1" className={classes.typographyText}>
              מידע נוסף:
            </Typography>
          </Grid>
        )}
        <Grid
          item
          xs={isMobile ? 5.75 : 3.75}
          className={classes.textFieldContainer}
          alignItems="center"
          style={editOpacity}
        >
          <TextField
            onChange={(e) => setNewCharacteristic(e.target.value)}
            value={newCharacteristic}
            variant="outlined"
            placeholder="שם מאפיין"
            className={classes.textField}
            disabled={!isEditMode}
            style={editOpacity}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={isMobile ? 5.75 : 3.75}
          className={classes.textFieldContainer}
          disabled={!isEditMode}
          style={editOpacity}
          alignItems="center"
        >
          <TextField
            onChange={(e) => setNewValaue(e.target.value)}
            variant="outlined"
            value={newValue}
            placeholder="נתון"
            className={classes.textField}
            disabled={!isEditMode}
            style={editOpacity}
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={0.5}
          container
          justifyContent="flex-start"
          alignItems="center"
        >
          {isEditMode && (
            <>
              <Tooltip
                title="הוסף"
                placement="bottom"
                PopperProps={{
                  modifiers: [{ name: "offset", options: { offset: [0, 5] } }],
                }}
                style={editOpacity}
              >
                <AddBoxRoundedIcon
                  onClick={handleAdd}
                  fontSize="small"
                  style={{
                    verticalAlign: "middle",
                    marginTop: 5,
                  }}
                />
              </Tooltip>
            </>
          )}
        </Grid>
      </Grid>

      {elementsByCount.map((elem, index) => (
        <Grid
          container
          spacing={1.5}
          key={elem.id}
          alignItems="center"
          style={{ marginTop: 1 }}
        >
          <Grid item xs={2} container />
          <Grid
            item
            xs={isMobile ? 5.75 : 3.75}
            className={classes.textFieldContainer}
          >
            <Tooltip
              title={errors?.extraData?.[index]?.characteristic}
              open={!!errors?.extraData?.[index]?.characteristic}
              PopperProps={{
                modifiers: [{ name: "offset", options: { offset: [0, 3] } }],
              }}
              arrow
            >
              <TextField
                variant="outlined"
                name="characteristic"
                value={elem.characteristic}
                onChange={(e) => handleChange(e, index)}
                onBlur={(e) => {
                  handleBlur(e, index);
                }}
                disabled={!isEditMode}
                className={classes.textField}
                error={!!errors?.extraData?.[index]?.characteristic}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-error": {
                      borderColor: "red",
                    },
                  },
                }}
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={isMobile ? 5.75 : 3.75}
            className={classes.textFieldContainer}
          >
            <Tooltip
              title={errors?.extraData?.[index]?.value}
              open={!!errors?.extraData?.[index]?.value}
              PopperProps={{
                modifiers: [{ name: "offset", options: { offset: [0, 3] } }],
              }}
              arrow
            >
              <TextField
                variant="outlined"
                name="value"
                onChange={(e) => handleChange(e, index)}
                onBlur={(e) => {
                  handleBlur(e, index);
                }}
                value={elem.value}
                disabled={!isEditMode}
                className={classes.textField}
                error={Boolean(errors?.extraData?.[index]?.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-error": {
                      borderColor: "red",
                    },
                  },
                }}
                fullWidth
              />
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={0.5}
            container
            justifyContent="flex-start"
            alignItems="center"
          >
            {isEditMode && (
              <>
                <Tooltip
                  title="הסר"
                  placement="bottom"
                  PopperProps={{
                    modifiers: [
                      { name: "offset", options: { offset: [0, 5] } },
                    ],
                  }}
                >
                  <DeleteIcon
                    onClick={() => handleRemove(elem)}
                    fontSize="small"
                    style={{
                      verticalAlign: "middle",
                      marginTop: 5,
                    }}
                  />
                </Tooltip>
              </>
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default ExtraDataList;
