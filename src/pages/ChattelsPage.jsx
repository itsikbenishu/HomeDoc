import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Grid, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import {
  fetchHomeDoc,
  selectHomeDoc,
  selectHomeDocStatus,
} from "../slices/HomeDocSlice";
import { HOME_DOC_PAGES_TYPES, STATUSES } from "../Constants";
import { useExtraHomeDocFormik } from "../hooks/useExtraHomeDocFormik";
import ChattelsBasicDataCard from "../componets/ChattelsBasicDataCard";
import ChattelsExtraDataCard from "../componets/ChattelsExtraDataCard";
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

const ChattelsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const chattels = useSelector(selectHomeDoc);
  const homeDocStatus = useSelector(selectHomeDocStatus);
  const chattelsEntityId = params.id;
  const pageType = HOME_DOC_PAGES_TYPES.CHATTELS;
  const isEditMode = params.mode === "Edit";
  const extraHomeDocFormik = useExtraHomeDocFormik(
    chattels,
    dispatch,
    pageType
  );

  useEffect(() => {
    dispatch(fetchHomeDoc({ id: chattelsEntityId, pageType: pageType }));
  }, [chattelsEntityId, pageType, dispatch]);

  let isLoading =
    homeDocStatus === STATUSES.IDLE || homeDocStatus === STATUSES.PENDING;

  const entityTitle = `פריט: ${chattels.interiorEntityKey}`;
  const entitySubTitle = chattels.fatherInteriorEntityKey;

  return (
    <EditModeContext.Provider value={isEditMode}>
      {isLoading || !chattels?.id ? (
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
                    <ChattelsBasicDataCard
                      entityTitle={entityTitle}
                      entitySubTitle={{
                        title: entitySubTitle,
                        fatherId: chattels?.fatherId,
                        type: chattels?.fatherType,
                      }}
                      entityType={chattels.type}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={6} md={9}>
                  <Paper
                    elevation={1}
                    className={classes.paper}
                    style={{
                      backgroundColor: "rgb(205 213 225)",
                      borderColor: "rgb(205 213 225)",
                    }}
                  >
                    <ChattelsExtraDataCard chattels={chattels} />
                  </Paper>
                </Grid>
                <Grid item xs={6} sm={12} style={{ paddingTop: "0.5rem" }}>
                  <LabeledContainer lableName={"תמונות"}>
                    <div>בפיתוח</div>
                  </LabeledContainer>
                </Grid>
              </Grid>
            </Card>
          </Formik>
      )}
    </EditModeContext.Provider>
  );
};

export default ChattelsPage;
