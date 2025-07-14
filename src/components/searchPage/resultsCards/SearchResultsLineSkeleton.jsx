import { Card, Stack, Skeleton, Box, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    width: "100%",
    minHeight: "2.5rem",
    overflowX: "auto",
  },
  box: {
    flexBasis: 0,
    textAlign: "center",
    color: "#430494",
    fontSize: "1.05rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

const SearchResultsLineSkeleton = ({ columns = 3, columnRatios = [] }) => {
  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      sx={{
        p: 0.5,
        my: 0.5,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {Array.from({ length: columns }).map((_, index) => (
          <Box
            key={`skeleton-${index}`}
            className={classes.box}
            sx={{
              flexGrow: columnRatios[index] ?? 1,
            }}
          >
            <Skeleton width="100%" height={24} />
          </Box>
        ))}
        <Box sx={{ flexShrink: 0 }}>
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      </Stack>
    </Card>
  );
};

export default SearchResultsLineSkeleton;
