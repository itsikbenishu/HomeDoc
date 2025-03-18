import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Grid, Paper } from "@mui/material";
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
} from "../Constants";
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
    height: "100%",
    padding: "0.2rem",
    marginTop: "1rem",
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

  let isLoading =
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
            <Card sx={{ bgcolor: (theme) => theme.palette.primary.main , height: "90vh" }}>
              <Grid
                container
                spacing={0.5}
                style={{ height: " 100vh" }}
                direction="column"
              >
                <Grid item xs={6} sm={6} md={3}>
                  <Paper
                    elevation={1}
                    className={classes.paper}
                    style={{
                      backgroundColor: "rgb(205 213 225)",
                      borderColor: "rgb(205 213 225)",
                      marginBottom: "-0.5rem",
                    }}
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
                    ></ResidenceBasicDataCard>
                  </Paper>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={residenceType === "ROOM" ? 7.9 : 9}
                >
                  <Paper
                    elevation={1}
                    className={classes.paper}
                    style={{
                      backgroundColor: "rgb(205 213 225)",
                      borderColor: "rgb(205 213 225)",
                    }}
                  >
                    <ResidenceExtraDataCard residence={residence} />
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={6} style={{ paddingTop: "0.5rem" }}>
                  <LabeledContainer lableName={"תמונות"}>
                    <div>בפיתוח</div>
                  </LabeledContainer>
                </Grid>
                <Grid item xs={6} sm={6} style={{ paddingTop: "0.5rem" }}>
                  {residenceType === "PROPERTY" ? (
                    <Paper
                      elevation={2}
                      className={classes.paper}
                      style={{ backgroundColor: "#130b65" }}
                    ></Paper>
                  ) : (
                    <LabeledContainer lableName="מבט על">
                      <div>בפיתוח</div>
                    </LabeledContainer>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Formik>
      )}
    </EditModeContext.Provider>
  );
};

export default HomeDocResidencePage;
