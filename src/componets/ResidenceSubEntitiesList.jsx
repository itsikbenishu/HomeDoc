import { Box, Card, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { HOME_DOC_PAGE_TYPE, SUB_HOME_DOC_TYPE } from "../../Constants";
import { selectHomeDocEntityCategory } from "../slices/HomeDocSlice";
import { useTranslatedConstants } from "../hooks/useTranslatedConstants";
import { useInputDirection } from "../hooks/useInputDirection";
import Link from "../componets/Link";
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
  subEntityMaxLen = 20,
  entityType,
}) => {
  const classes = useStyles();
  const category = useSelector(selectHomeDocEntityCategory);
  const { HOME_DOC_RESIDENCE_TYPE, SUB_HOME_DOC_LIST } =
    useTranslatedConstants();
  const inputDirection = useInputDirection();
  const isExpand = subEntitiesList.length <= subEntitiesMax;
  const truncateText = (text) => {
    return text.length > subEntityMaxLen
      ? text.slice(0, subEntityMaxLen) + "..."
      : text;
  };
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
    <Card className={classes.card} sx={{ bgcolor: "transparent" }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Box sx={{ width: 65, p: 0 }}>
          <Typography variant="body1" className={classes.typographyText}>
            {`${subEntityName}:`}
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          flexGrow={1}
        >
          {firstElemnts.map((subEntity) => (
            <Box
              key={subEntity.id}
              className={classes.subEntity}
              sx={{
                width: `${100 / (subEntitiesMax + (isExpand ? 0.5 : 1))}%`,
                maxWidth: `${100 / (subEntitiesMax + (isExpand ? 0.5 : 1))}%`,
                flexShrink: 0,
              }}
            >
              <Typography
                variant="subtitle1"
                className={classes.typographyText}
                noWrap
                dir={inputDirection(subEntity.interiorEntityKey)}
              >
                <Link
                  to={`/Results/${HOME_DOC_PAGE_TYPE[subEntity.type]}/${
                    subEntity.id
                  }`}
                >
                  {truncateText(subEntity.interiorEntityKey)}
                </Link>
              </Typography>
            </Box>
          ))}

          <Box className={classes.subEntity} sx={{ flexShrink: 0 }}>
            <CreateSubHomeDialog homeDocType={subEntityType} />
          </Box>

          {!isExpand && (
            <Box className={classes.subEntity} sx={{ flexShrink: 0 }}>
              <SubEntitiesDialog
                subEntityPreName={subEntityPreName}
                subEntitesName={subEntityName}
                subEntitiesList={subEntitiesList}
                entityType={entityType}
              />
            </Box>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ResidenceSubEntitiesList;
