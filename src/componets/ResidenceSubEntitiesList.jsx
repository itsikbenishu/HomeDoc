import { Link } from "react-router-dom";
import { Box, Card, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { HOME_DOC_PAGE_TYPE, SUB_HOME_DOC_TYPE } from "../../Constants";
import { selectHomeDocEntityCategory } from "../slices/HomeDocSlice";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import CreateSubHomeDialog from "./CreateSubHomeDialog";
import SubEntitiesDialog from "./SubEntitiesDialog";

const useStyles = makeStyles(() => ({
  card: {
    padding: 0,
    backgroundColor: "transparent",
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
  subEntitiesMax = 5,
  entityType,
}) => {
  const classes = useStyles();
  const category = useSelector(selectHomeDocEntityCategory);
  const { HOME_DOC_RESIDENCE_TYPE, SUB_HOME_DOC_LIST } =
    useTranslatedConstants();
  const isExpand = subEntitiesList.length <= subEntitiesMax;
  const firstElemnts = subEntitiesList.slice(0, subEntitiesMax);
  const subEntityName = `${
    SUB_HOME_DOC_LIST[SUB_HOME_DOC_TYPE[category][subEntityType]]
  }`;

  const subEntityPreName =
    SUB_HOME_DOC_TYPE[category][entityType] === "FLOOR" ||
    SUB_HOME_DOC_TYPE[category][entityType] === "APARTMENT"
      ? `${HOME_DOC_RESIDENCE_TYPE[SUB_HOME_DOC_TYPE[category][entityType]]}: `
      : "";

  return (
    <Card
      className={classes.card}
      sx={{
        bgcolor: "transparent",
      }}
    >
      <Grid
        container
        spacing={{
          xs: 6,
          sm: 0.5,
        }}
      >
        <Grid item xs={2}>
          <Box
            sx={{
              p: 0,
              bgcolor: "transparent",
            }}
          >
            <Typography
              variant="body1"
              className={classes.typographyText}
            >{`${subEntityName}:`}</Typography>
          </Box>
        </Grid>

        {firstElemnts.map((subEntity) => (
          <Grid item xs={1} key={subEntity.id}>
            <Box
              className={classes.subEntity}
              sx={{
                bgcolor: "transparent",
              }}
              key={subEntity.id}
            >
              <Typography variant="body1" className={classes.typographyText}>
                <Link
                  to={`/Results/${HOME_DOC_PAGE_TYPE[subEntity.type]}/${
                    subEntity.id
                  }`}
                  key={subEntity.id}
                >
                  {subEntity.interiorEntityKey}
                </Link>
              </Typography>
            </Box>
          </Grid>
        ))}
        <Grid item xs={1}>
          <Box
            className={classes.subEntity}
            sx={{
              bgcolor: "transparent",
            }}
          >
            <CreateSubHomeDialog
              homeDocType={subEntityType}
            ></CreateSubHomeDialog>
          </Box>
        </Grid>
        <Grid item xs={1}>
          {!isExpand && (
            <Box
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
            </Box>
          )}
        </Grid>
      </Grid>
    </Card>
  );
};

export default ResidenceSubEntitiesList;
