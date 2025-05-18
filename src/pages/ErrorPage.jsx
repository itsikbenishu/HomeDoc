import { useTranslation } from "react-i18next";
import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import Link from "../componets/Link";

const ErrorPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "40vh",
        px: 2,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography
          variant={isMobile ? "h3" : "h2"}
          sx={{
            textAlign: "center",
            color: theme.palette.primary.contrastText,
          }}
        >
          {t("error_page.title")}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          {t("error_page.sub_title")}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          {t("error_page.note")}
          <Link
            to="/Results?"
            sx={{
              color: theme.palette.primary.contrastText,
              textDecoration: "underline",
            }}
          >
            {t("error_page.search_page")}
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default ErrorPage;
