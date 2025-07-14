import { Box, Typography } from "@mui/material";

const HeaderPage = ({ headerName, cardClass, others }) => {
  return (
    <Box sx={{ textAlign: "center" }} className={cardClass}>
      <Typography
        variant="h4"
        {...others}
        sx={{ color: (theme) => theme.palette.primary.contrastText }}
      >
        {headerName}
      </Typography>
    </Box>
  );
};

export default HeaderPage;
