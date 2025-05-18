import { styled } from "@mui/material/styles";

export const ParentGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(6, 1fr)",
  gridColumnGap: 0,
  gridRowGap: 0,
  height: "100%",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto auto",
  },
}));

// .div1 { grid-area: 1 / 1 / 2 / 4; }
// .div2 { grid-area: 2 / 1 / 7 / 4; }
// .div3 { grid-area: 1 / 4 / 7 / 6; }

const areaStyles = {
  basicDataCard: {
    desktop: "1 / 1 / 3 / 4",
    tablet: "1 / 1 / 2 / 3",
    mobile: "1 / 1 / 2 / 2",
  },
  extraDataCard: {
    desktop: "3 / 1 / 7 / 4",
    tablet: "2 / 1 / 3 / 3",
    mobile: "2 / 1 / 3 / 2",
  },
  images: {
    desktop: "1 / 4 / 4 / 6",
    tablet: "1 / 2 / 2 / 3",
    mobile: "3 / 1 / 4 / 2",
  },
  look_at: {
    desktop: "4 / 4 / 7 / 6",
    tablet: "2 / 2 / 3 / 3",
    mobile: "4 / 1 / 5 / 2",
  },
};

const createResponsiveDiv = (area) =>
  styled("div")(({ theme }) => ({
    gridArea: area.desktop,
    [theme.breakpoints.down("md")]: {
      gridArea: area.tablet,
    },
    [theme.breakpoints.down("sm")]: {
      gridArea: area.mobile,
    },
  }));

export const PageDivision = Object.entries(areaStyles).reduce(
  (acc, [key, value]) => {
    acc[key] = createResponsiveDiv(value);
    return acc;
  },
  {}
);
