import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "../componets/Link";

import BackgroundImage from "../images/Background_Gemini_Generated_Image.png";

const ErrorPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: { xs: "100vh", sm: "90vh" },
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "40vh",
        px: 2,
      }}
    >
      <Card
        sx={{
          p: 4,
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              textAlign: "center",
              color: theme.palette.primary.main,
            }}
          >
            {t("error_page.title")}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            {t("error_page.sub_title")}
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            {t("error_page.note")}
            <Link
              to="/Results?"
              sx={{
                color: theme.palette.primary.main,
                textDecoration: "underline",
              }}
            >
              {t("error_page.search_page")}
            </Link>
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
};

export default ErrorPage;
