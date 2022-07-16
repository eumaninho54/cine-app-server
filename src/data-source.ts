import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tickets } from "./entity/Tickets";
import { User } from "./entity/User";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entity/*.{js,ts}"],
  migrations: [],
  subscribers: [],
  ssl: process.env.NOTSSL ? false : true
});