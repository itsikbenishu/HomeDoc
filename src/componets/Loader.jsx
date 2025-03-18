import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div
      style={{
        textAlign: "center",
        margin: "auto",
      }}
    >
      <h1 style={{ color: "white" }}>טוען</h1>
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
