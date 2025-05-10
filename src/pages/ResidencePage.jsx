import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import {
  fetchHomeDoc,
  selectHomeDoc,
  selectHomeDocEntityType,
  selectHomeDocStatus,
} from "../slices/HomeDocSlice";
import {
  HOME_DOC_CATEGORIES,
  HOME_DOC_PAGES_TYPES,
  HOME_DOC_RESIDENCE_TYPE,
  STATUSES,
} from "../../Constants";
import { useExtraHomeDocFormik } from "../hooks/useExtraHomeDocFormik";
import ResidenceBasicDataCard from "../componets/ResidenceBasicDataCard";
import ResidenceExtraDataCard from "../componets/ResidenceExtraDataCard";
import LabeledContainer from "../componets/LabeledContainer";
import Loader from "../componets/Loader";
import { EditModeContext } from "../hooks/useIsEditMode";

const useStyles = makeStyles(() => ({
  header: {
    margin: "0 0rem 2rem 0rem",
  },
  paper: {
    padding: "0.2rem",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "relative",
  },
}));

const HomeDocResidencePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const residence = useSelector(selectHomeDoc);
  const residenceType = useSelector(selectHomeDocEntityType);
  const homeDocStatus = useSelector(selectHomeDocStatus);
  const pageType = HOME_DOC_PAGES_TYPES.RESIDENCE;
  const residenceEntityId = params.id;
  const isEditMode = params.mode === "Edit";
  const extraHomeDocFormik = useExtraHomeDocFormik(
    residence,
    dispatch,
    pageType
  );

  useEffect(() => {
    dispatch(fetchHomeDoc({ id: residenceEntityId, pageType: pageType }));
  }, [residenceEntityId, pageType, dispatch]);

  const isLoading =
    homeDocStatus === STATUSES.IDLE || homeDocStatus === STATUSES.PENDING;

  const entityTitle =
    residenceType === "PROPERTY"
      ? HOME_DOC_CATEGORIES[residence.category]
      : `${HOME_DOC_RESIDENCE_TYPE[residenceType]}: ${residence.interiorEntityKey}`;
  const entitySubTitle =
    residenceType === "PROPERTY"
      ? residence.interiorEntityKey
      : residence.fatherInteriorEntityKey;

  return (
    <EditModeContext.Provider value={isEditMode}>
      {isLoading || !residence?.id ? (
        <Loader />
      ) : (
        <Formik
          initialValues={extraHomeDocFormik.initialValues}
          validationSchema={extraHomeDocFormik.validationSchema}
          onSubmit={extraHomeDocFormik.onSubmit}
        >
          <Paper
            sx={{
              bgcolor: (theme) => theme.palette.primary.main,
              height: isMobile && residenceType === "ROOM" ? "auto" : "90vh",
              overflowY: "auto",
              mx: 1,
            }}
          >
            <Grid
              container
              sx={{ height: "100%" }}
              direction={isMobile ? "row" : "column"}
            >
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={1}
                  className={classes.paper}
                  sx={(theme) => ({
                    bgcolor: theme.palette.secondary.main,
                    height: "calc(100% - 4px)",
                    mb:
                      residenceType === "PROPERTY"
                        ? -0.5
                        : residenceType === "ROOM"
                        ? 4
                        : 1,
                  })}
                >
                  <ResidenceBasicDataCard
                    entityTitle={entityTitle}
                    entitySubTitle={{
                      title: entitySubTitle,
                      fatherId: residence?.fatherId,
                      type: residence?.fatherType,
                    }}
                    entityType={residence.type}
                    subEntities={residence.subEntities}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={residenceType === "ROOM" ? 7.9 : 9}>
                <Paper
                  elevation={1}
                  className={classes.paper}
                  sx={(theme) => ({
                    bgcolor: theme.palette.secondary.main,
                    height:
                      residenceType === "PROPERTY"
                        ? "calc(100% - 5px)"
                        : "100%",
                  })}
                >
                  <ResidenceExtraDataCard residence={residence} />
                </Paper>
              </Grid>
              {!isMobile && (
                <>
                  <Grid item xs={12} sm={6} sx={{ pt: 0.5 }}>
                    <LabeledContainer lableName={"תמונות"}>
                      <div>בפיתוח</div>
                    </LabeledContainer>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ pt: 0.5 }}>
                    {residenceType === "PROPERTY" ? (
                      <Paper
                        elevation={2}
                        className={classes.paper}
                        sx={{
                          bgcolor: (theme) => theme.palette.primary.main,
                          height:
                            residenceType === "PROPERTY"
                              ? "100%"
                              : "calc(100% - 4px)",
                        }}
                      ></Paper>
                    ) : (
                      <LabeledContainer lableName="מבט על">
                        <div>בפיתוח</div>
                      </LabeledContainer>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
        </Formik>
      )}
    </EditModeContext.Provider>
  );
};

export default HomeDocResidencePage;
