import { useMemo } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { Box, Grid, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HOME_DOC_CHATTELS_TYPE, SUB_HOME_DOC_TYPE } from "../../Constants";
import {
  deleteHomeDoc,
  selectHomeDocEntityCategory,
} from "../slices/HomeDocSlice";
import ButtonsLine from "./ButtonsLine";
import getButtonsLineComps from "./getButtonsLineComps";

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

const ChattelsBasicDataCard = ({ entityTitle, entitySubTitle, entityType }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const formik = useFormikContext();
  const dispatch = useDispatch();
  const residenceId = useParams().id;
  const category = useSelector(selectHomeDocEntityCategory);

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
          sx={{
            bgcolor: (theme) => theme.palette.secondary.main,
            ml: 0.25,
          }}
        >
          <Grid container direction="column" sx={{ marginBottom: "-2rem" }}>
            <Grid item xs={3}>
              <Typography variant="h5" className={classes.typographyText}>
                {entityTitle}
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{
                paddingLeft: "0.2rem",
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
          sx={{
            bgcolor: (theme) => theme.palette.secondary.main,
            ml: 0.25,
          }}
        >
          <Card
            className={classes.card}
            sx={{
              bgcolor: "transparent",
            }}
          >
            <Grid container spacing={0.5}>
              <Grid item xs={2}>
                <Box
                  sx={{
                    bgcolor: "transparent",
                    ml: "4px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyText}
                  >
                    סוג:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box
                  sx={{
                    bgcolor: "transparent",
                    mr: 1.25,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyText}
                  >
                    {
                      HOME_DOC_CHATTELS_TYPE[
                        SUB_HOME_DOC_TYPE[category][entityType]
                      ]
                    }
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
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
          <Card
            className={classes.card}
            sx={{
              bgcolor: "transparent",
            }}
          >
            <Grid container spacing={0.5}>
              <Grid item xs={2}>
                <Box sx={{ bgcolor: "transparent", ml: 0.25 }}>
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyText}
                  >
                    חדר:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={10}>
                <Box
                  sx={{
                    bgcolor: "transparent",
                    mr: 1.25,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    className={classes.typographyText}
                  >
                    <Link to={`/Results/Residence/${entitySubTitle.fatherId}`}>
                      {entitySubTitle.title}
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChattelsBasicDataCard;
