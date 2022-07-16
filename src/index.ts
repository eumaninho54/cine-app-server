import * as express from "express";
import * as bodyParser from "body-parser";
import routes from "./routes";
import * as cors from "cors"
import { AppDataSource } from "./data-source";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log("FOI!");
  })
  .catch((error) => {
    console.log(error);
  });


app.use(bodyParser.json());
app.use(routes);
app.use(cors())

app.listen(process.env.PORT || 3333);