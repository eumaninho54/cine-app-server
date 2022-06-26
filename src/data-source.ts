import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tickets } from "./entity/Tickets";
import { User } from "./entity/User";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Tickets],
  migrations: [],
  subscribers: [],
});
