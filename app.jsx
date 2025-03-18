const express = require("express");
const cors = require("cors");

const homeDocRouter = require("./routes/homeDocRoute");

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/homeDocs", homeDocRouter);

module.exports = app;
