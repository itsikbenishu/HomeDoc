import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { SUB_HOME_DOC_TYPE } from "../../Constants";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import {
  deleteHomeDoc,
  selectHomeDocEntityCategory,
} from "../slices/HomeDocSlice";
import ResidenceSubEntitiesList from "./ResidenceSubEntitiesList";
import ButtonsLine from "./ButtonsLine";
import getButtonsLineComps from "./getButtonsLineComps";
import { useInputDirection } from "../hooks/useInputDirection";

const useStyles = makeStyles(() => ({
  Box: {
    height: "100%",
    display: "flex",
    boxShadow: "none",
  },
  card: {
    padding: 0,
    width: "calc(100% - 4px)",
    marginRight: "4px",
  },
  typographyText: {
    color: "#130b65",
  },
}));

const ResidenceBasicDataCard = ({
  entityTitle,
  entitySubTitle,
  entityType,
  subEntities = [],
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormikContext();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const { HOME_DOC_RESIDENCE_TYPE } = useTranslatedConstants();
  const inputDirection = useInputDirection();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const residenceId = useParams().id;
  const category = useSelector(selectHomeDocEntityCategory);

  const getFatherResidence = (category, subResidece) =>
    Object.keys(SUB_HOME_DOC_TYPE[category]).find((key) => {
      return SUB_HOME_DOC_TYPE[category][key] === subResidece;
    });

  const otherHandlers = useMemo(() => {
    return {
      delete: () => {
        dispatch(
          deleteHomeDoc({
            id: residenceId,
          })
        );
        navigate("/");
      },
    };
  }, [dispatch, residenceId, navigate]);

  const buttons = useMemo(
    () => getButtonsLineComps(navigate, location, formik, otherHandlers),
    [navigate, location, formik, otherHandlers]
  );

  return (
    <Grid container spacing={0.75} direction="column">
      <Grid item xs={12} sm={3}>
        <Box
          className={classes.Box}
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            ml: 0.25,
          })}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            style={{ marginBottom: "-2rem" }}
          >
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.typographyText}>
                {entityTitle}
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                pl: 0.2,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ButtonsLine buttons={buttons} />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Box
          className={classes.Box}
          sx={(theme) => ({
            bgcolor: theme.palette.secondary.main,
            ml: 0.25,
          })}
        >
          <Card className={classes.card} sx={{ bgcolor: "transparent" }}>
            <Grid container spacing={2}>
              <Grid item xs="auto">
                <Box sx={{ bgcolor: "transparent", ml: 0.25 }}>
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyText}
                    sx={{ whiteSpace: "nowrap" }}
                  >
                    {!entityType || entityType === "PROPERTY"
                      ? t("residence_cards.title_address")
                      : HOME_DOC_RESIDENCE_TYPE[
                          getFatherResidence(category, entityType)
                        ]}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs>
                <Box sx={{ bgcolor: "transparent", mr: 5 }}>
                  {entitySubTitle.fatherId ? (
                    <Typography
                      variant="subtitle1"
                      className={classes.typographyText}
                      dir={inputDirection(entitySubTitle.title)}
                    >
                      <Link
                        to={`/Results/Residence/${entitySubTitle.fatherId}`}
                      >
                        {entitySubTitle.title}
                      </Link>
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      className={classes.typographyText}
                    >
                      {entitySubTitle.title}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
      {Object.keys(SUB_HOME_DOC_TYPE[category])
        .filter((subtype) => subtype.includes(entityType))
        .map((filterdSubType) => (
          <Grid item xs={12} sm={3} key={`${filterdSubType}`}>
            <Box
              className={classes.Box}
              sx={{
                backgroundColor: (theme) => theme.palette.secondary.main,
                ml: 0.25,
              }}
            >
              <ResidenceSubEntitiesList
                subEntityType={`${filterdSubType}`}
                subEntitiesList={subEntities.filter((subEntity) =>
                  subEntity.type.includes("ROOM_")
                    ? subEntity.type ===
                      `ROOM_${SUB_HOME_DOC_TYPE[category][filterdSubType]}`
                    : subEntity.type ===
                      SUB_HOME_DOC_TYPE[category][filterdSubType]
                )}
                subEntitiesMax={isMobile ? 2 : 5}
                entityType={entityType}
              />
            </Box>
          </Grid>
        ))}
    </Grid>
  );
};

export default ResidenceBasicDataCard;
