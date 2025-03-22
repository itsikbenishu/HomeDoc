import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { fileURLToPath } from "url";
import { dirname } from "path";

import homeDocRouter from "./routes/homeDocRoute.js";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename); runHomeDocExpress

const app = express();

app.use(express.json());
//app.use(express.static(`${__dirname}/public`));  
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/homeDocs", homeDocRouter);

export default app;
