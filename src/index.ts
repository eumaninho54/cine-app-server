import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import * as crypto from "crypto-js";

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.listen(3333);

AppDataSource.initialize()
  .then(() => {
    console.log("FOI!");
  })
  .catch((error) => {
    console.log(error);
  });
