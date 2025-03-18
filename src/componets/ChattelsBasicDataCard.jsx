import { useMemo } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { Paper, Grid, Typography, Card } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HOME_DOC_CHATTELS_TYPE, SUB_HOME_DOC_TYPE } from "../Constants";
import {
  deleteHomeDoc,
  selectHomeDocEntityCategory,
} from "../slices/HomeDocSlice";
import ButtonsLine from "./ButtonsLine";
import getButtonsLineComps from "./getButtonsLineComps";

const useStyles = makeStyles(() => ({
  paper: {
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
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            backgroundColor: "rgb(205 213 225)",
            borderColor: "rgb(205 213 225)",
            marginRight: "4px",
          }}
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
              style={{
                paddingLeft: "0.2rem",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ButtonsLine buttons={buttons} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            backgroundColor: "rgb(205 213 225)",
            borderColor: "rgb(205 213 225)",
            marginLeft: "4px",
          }}
        >
          <Card
            className={classes.card}
            style={{
              backgroundColor: "transparent",
              borderColor: "grey",
            }}
          >
            <Grid container spacing={0.5}>
              <Grid item xs={2}>
                <Paper
                  elevation={0}
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: "4px",
                  }}
                >
                  <Typography variant="h7" className={classes.typographyText}>
                    סוג:
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={10}>
                <Paper
                  elevation={0}
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "20px",
                  }}
                >
                  <Typography variant="h7" className={classes.typographyText}>
                    {
                      HOME_DOC_CHATTELS_TYPE[
                        SUB_HOME_DOC_TYPE[category][entityType]
                      ]
                    }
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Paper
          elevation={0}
          className={classes.paper}
          style={{
            backgroundColor: "rgb(205 213 225)",
            borderColor: "rgb(205 213 225)",
            marginLeft: "4px",
          }}
        >
          <Card
            className={classes.card}
            style={{
              backgroundColor: "transparent",
              borderColor: "grey",
            }}
          >
            <Grid container spacing={0.5}>
              <Grid item xs={2}>
                <Paper
                  elevation={0}
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: "4px",
                  }}
                >
                  <Typography variant="h7" className={classes.typographyText}>
                    חדר:
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={10}>
                <Paper
                  elevation={0}
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "20px",
                  }}
                >
                  <Typography variant="h7" className={classes.typographyText}>
                    <Link
                      to={`/Results/Residence/${entitySubTitle.fatherId}`}
                    >
                      {entitySubTitle.title}
                    </Link>
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChattelsBasicDataCard;
