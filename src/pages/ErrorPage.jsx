import { useTranslation } from "react-i18next";
import { Box, Stack, Typography } from "@mui/material";
import Link from "../componets/Link";

const ErrorPage = () => {
  const { t } = useTranslation();

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
          variant="h2"
          sx={{
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          {t("error_page.title")}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          {t("error_page.sub_title")}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: (theme) => theme.palette.primary.contrastText }}
        >
          {t("error_page.note")}
          <Link
            to="/Results?"
            sx={{
              color: (theme) => theme.palette.primary.contrastText,
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
