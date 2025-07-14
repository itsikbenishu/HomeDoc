import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Paper, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik } from "formik";
import {
  fetchHomeDoc,
  selectHomeDoc,
  selectHomeDocStatus,
} from "../slices/HomeDocSlice";
import { HOME_DOC_PAGES_TYPES, STATUSES } from "../../Constants";
import { useExtraHomeDocFormik } from "../hooks/useExtraHomeDocFormik";
import ErrorPage from "./ErrorPage";
import {
  ParentGrid,
  PageDivision,
} from "../components/entityPage/layout/HomeDocPageGrid";
import ChattelsBasicDataCard from "../components/entityPage/cards/ChattelsBasicDataCard";
import ChattelsExtraDataCard from "../components/entityPage/cards/ChattelsExtraDataCard";
import LabeledContainer from "../components/entityPage/layout/LabeledContainer";
import Loader from "../components/common/Loader";
import { EditModeContext } from "../hooks/useIsEditMode";

import BackgroundImage from "../images/Background_Gemini_Generated_Image.png";
const useStyles = makeStyles(() => ({
  header: {
    margin: "0 0rem 2rem 0rem",
  },
  paper: {
    height: "100%",
    padding: "0.2rem",
    borderRadius: 8,
    position: "relative",
  },
}));

const ChattelsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
  const isRejected = homeDocStatus === STATUSES.REJECTED;

  if (isRejected) return <ErrorPage />;

  const entityTitle = `${t("chattels_cards.title_item")} ${
    chattels?.interiorEntityKey
  }`;
  const entitySubTitle = chattels?.fatherInteriorEntityKey;

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
          <Card
            sx={{
              backgroundImage: `url(${BackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "91vh",
            }}
          >
            <ParentGrid
              container
              sx={{ height: "100%", mt: 0.3, mx: 1 }}
              direction={isMobile ? "row" : "column"}
            >
              <PageDivision.basicDataCard>
                <Paper
                  elevation={1}
                  className={classes.paper}
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    height: "calc(100% - 4px)",
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
              </PageDivision.basicDataCard>
              <PageDivision.extraDataCard>
                <Paper
                  elevation={1}
                  className={classes.paper}
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    height: "calc(100% - 5px)",
                  }}
                >
                  <ChattelsExtraDataCard />
                </Paper>
              </PageDivision.extraDataCard>
              {!isMobile && (
                <PageDivision.images>
                  <LabeledContainer labelName={t("page_card_lables.images")}>
                    <div> {t("in_development")}</div>
                  </LabeledContainer>
                </PageDivision.images>
              )}
            </ParentGrid>
          </Card>
        </Formik>
      )}
    </EditModeContext.Provider>
  );
};

export default ChattelsPage;
