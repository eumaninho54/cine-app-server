import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tickets } from "../entity/Tickets";
require("dotenv").config();

class TicketsController {
  
}

const ticketsController = new TicketsController();
export default ticketsController;
