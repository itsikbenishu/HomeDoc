import ReactLoading from "react-loading";
import i18next from "../../i18nConfig";

import BackgroundImage from "../images/Background_Gemini_Generated_Image.png";
import { Typography } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        textAlign: "center",
        margin: "auto",
        height: "100vh",
      }}
    >
      <Typography variant="h3" sx={{ color: "white", pt: 10, pb: 1 }}>
        {i18next.t("loading")}
      </Typography>
      <div
        style={{
          width: "6.25rem",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactLoading
          type="spin"
          color="white"
          height="6.25rem"
          width="3.25rem"
        />
      </div>
    </div>
  );
};

export default Loader;
