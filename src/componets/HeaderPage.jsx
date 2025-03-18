import { Card, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  textAlign: "center",
}));

const HeaderPage = ({ headerName, cardClass }) => {
  return (
    <StyledCard className={cardClass}>
      <Typography variant="h4">{headerName}</Typography>
    </StyledCard>
  );
};

export default HeaderPage;
