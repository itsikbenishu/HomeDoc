import { Link } from "react-router-dom";
import { Paper, Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { selectHomeDocEntityCategory } from "../slices/HomeDocSlice";
import {
  HOME_DOC_RESIDENCE_TYPE,
  HOME_DOC_PAGE_TYPE,
  SUB_HOME_DOC_LIST,
  SUB_HOME_DOC_TYPE,
} from "../Constants";
import CreateSubHomeDialog from "./CreateSubHomeDialog";
import SubEntitiesDialog from "./SubEntitiesDialog";

const useStyles = makeStyles(() => ({
  card: {
    padding: 0,
    backgroundColor: "transparent",
    borderColor: "grey",
    width: "calc(100% - 4px)",
    marginRight: "4px",
    paddingRight: "4px",
  },
  subEntity: {
    padding: 0,
    marginTop: 1,
    textAlign: "center",
    backgroundColor: "transparent",
  },
  typographyText: {
    color: "#130b65",
  },
}));

const ResidenceSubEntitiesList = ({
  subEntityType,
  subEntitiesList,
  entityType,
}) => {
  const classes = useStyles();
  const category = useSelector(selectHomeDocEntityCategory);
  const isExpand = subEntitiesList.length <= 5;
  const firstFiveElemnts = subEntitiesList.slice(0, 5);
  const subEntityName = `${SUB_HOME_DOC_LIST[SUB_HOME_DOC_TYPE[category][subEntityType]]}`;

  const subEntityPreName =
    SUB_HOME_DOC_TYPE[category][entityType] === "FLOOR" ||
    SUB_HOME_DOC_TYPE[category][entityType] === "APARTMENT"
      ? `${HOME_DOC_RESIDENCE_TYPE[SUB_HOME_DOC_TYPE[category][entityType]]}: `
      : "";

  return (
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
              padding: 0,
              marginTop: 1,
              backgroundColor: "transparent",
            }}
          >
            <Typography
              variant="body1"
              className={classes.typographyText}
            >{`${subEntityName}:`}</Typography>
          </Paper>
        </Grid>

        {firstFiveElemnts.map((subEntity) => (
          <Grid item xs={1} key={subEntity.id}>
            <Paper
              elevation={0}
              className={classes.subEntity}
              style={{
                backgroundColor: "transparent",
              }}
              key={subEntity.id}
            >
              <Typography variant="body1" className={classes.typographyText}>
                <Link
                  to={`/Results/${HOME_DOC_PAGE_TYPE[subEntity.type]}/${subEntity.id}`}
                  key={subEntity.id}
                >
                  {subEntity.interiorEntityKey}
                </Link>
              </Typography>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={1}>
          <Paper
            elevation={0}
            className={classes.subEntity}
            style={{
              backgroundColor: "transparent",
            }}
          >
            <CreateSubHomeDialog
              homeDocType={subEntityType}
            ></CreateSubHomeDialog>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          {!isExpand && (
            <Paper
              elevation={0}
              className={classes.subEntity}
              style={{
                backgroundColor: "transparent",
              }}
            >
              <SubEntitiesDialog
                subEntityPreName={subEntityPreName}
                subEntitesName={subEntityName}
                subEntitiesList={subEntitiesList}
                entityType={entityType}
              ></SubEntitiesDialog>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default ResidenceSubEntitiesList;
