import ReactLoading from "react-loading";
import i18next from "../../i18nConfig";

const Loader = () => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
      }}
    >
      <h1 style={{ color: "white" }}>{i18next.t("loading")}</h1>
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
