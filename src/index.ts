import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import * as cors from "cors"

const app = express();

app.use(bodyParser.json());
app.use(routes);
app.use(cors())

app.listen(process.env.PORT || 3333);
