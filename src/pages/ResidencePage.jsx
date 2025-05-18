import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import {
  fetchHomeDoc,
  selectHomeDoc,
  selectHomeDocEntityType,
  selectHomeDocStatus,
} from "../slices/HomeDocSlice";
import { HOME_DOC_PAGES_TYPES, STATUSES } from "../../Constants";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import { useExtraHomeDocFormik } from "../hooks/useExtraHomeDocFormik";
import { ParentGrid, PageDivision } from "../componets/HomeDocPageGrid";
import ResidenceBasicDataCard from "../componets/ResidenceBasicDataCard";
import ResidenceExtraDataCard from "../componets/ResidenceExtraDataCard";
import LabeledContainer from "../componets/LabeledContainer";
import Loader from "../componets/Loader";
import { EditModeContext } from "../hooks/useIsEditMode";
import ErrorPage from "./ErrorPage";
import DirectionalTextSpan from "../componets/DirectionalTextSpan";

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

const ResidencePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { HOME_DOC_CATEGORIES, HOME_DOC_RESIDENCE_TYPE } =
    useTranslatedConstants();

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
  const isRejected = homeDocStatus === STATUSES.REJECTED;

  if (isRejected) return <ErrorPage />;

  const entityTitle =
    residenceType === "PROPERTY" ? (
      HOME_DOC_CATEGORIES[residence.category]
    ) : (
      <>
        <DirectionalTextSpan
          prefix={`${HOME_DOC_RESIDENCE_TYPE[residenceType]}: `}
          value={residence?.interiorEntityKey}
        />
      </>
    );

  const entitySubTitle =
    residenceType === "PROPERTY"
      ? residence?.interiorEntityKey
      : residence?.fatherInteriorEntityKey;

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
              height: "90vh",
              mx: 1,
            }}
          >
            <ParentGrid id="ParentGrid">
              <PageDivision.basicDataCard sx={{ mb: 1 }}>
                <Paper
                  elevation={1}
                  className={classes.paper}
                  sx={(theme) => ({
                    bgcolor: theme.palette.secondary.main,
                    height: "100%",
                    mb: residenceType === "PROPERTY" ? -0.5 : 1,
                  })}
                >
                  <ResidenceBasicDataCard
                    entityTitle={entityTitle}
                    entitySubTitle={{
                      title: entitySubTitle,
                      fatherId: residence?.fatherId,
                    }}
                    entityType={residence.type}
                    subEntities={residence.subEntities}
                  />
                </Paper>
              </PageDivision.basicDataCard>

              <PageDivision.extraDataCard>
                <Paper
                  elevation={1}
                  className={classes.paper}
                  sx={(theme) => ({
                    bgcolor: theme.palette.secondary.main,
                    height: "100%",
                  })}
                >
                  <ResidenceExtraDataCard residence={residence} />
                </Paper>
              </PageDivision.extraDataCard>

              {!isMobile && (
                <PageDivision.images>
                  <LabeledContainer labelName={t("page_card_lables.images")}>
                    <div>{t("in_development")}</div>
                  </LabeledContainer>
                </PageDivision.images>
              )}

              {residenceType !== "PROPERTY" && !isMobile && (
                <PageDivision.look_at>
                  {residenceType === "PROPERTY" ? (
                    <Paper
                      elevation={2}
                      className={classes.paper}
                      sx={{
                        bgcolor: (theme) => theme.palette.primary.main,
                        height: "100%",
                      }}
                    ></Paper>
                  ) : (
                    <LabeledContainer labelName={t("page_card_lables.look_at")}>
                      <div>{t("in_development")}</div>
                    </LabeledContainer>
                  )}
                </PageDivision.look_at>
              )}
            </ParentGrid>
          </Paper>
        </Formik>
      )}
    </EditModeContext.Provider>
  );
};

export default ResidencePage;
