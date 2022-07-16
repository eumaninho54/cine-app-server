import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tickets } from "./entity/Tickets";
import { User } from "./entity/User";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Tickets],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("FOI!");
  })
  .catch((error) => {
    console.log(error);
  });

