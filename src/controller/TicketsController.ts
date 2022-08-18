import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Favorites } from "../entity/Favorites";
import { Tickets } from "../entity/Tickets";
import { User } from "../entity/User";
require("dotenv").config();

class TicketsController {
  async getFavorites(request: Request, response: Response, next: NextFunction){
    const { id } = request.params

    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id)
    })

    if(user == null){
      return response.status(404).json({ message: "User not found!" })
    }

    return response.json(user.favorites)
  }

  async updateFavorite(request: Request, response: Response, next: NextFunction){
    const { id } = request.params
    const { isSelected, dataMovie } = request.body
    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id)
    })

    if (dataMovie == null){
      return response.status(404).json({ message: "Data movie is empty!" });
    }

    const haveFavorite = user.favorites.find((value) => value.id == dataMovie.id)

    if(isSelected){
      if(haveFavorite == null){
        await AppDataSource.manager.save(Favorites, {
          user: {
            id: user.id
          },
          ...dataMovie
        })
      }
    }else{
      if(haveFavorite != null){
        await AppDataSource.manager.remove(Favorites, {
          user: {
            id: user.id
          },
          ...dataMovie
        });
      }
    }

    const favorites = await AppDataSource.manager.find(Favorites, {
      where: {
        user: {
          id: user.id
        }
      }
    })
    return response.json({favorites: favorites});
  }

  async getTickets(request: Request, response: Response, next: NextFunction){
    const { id } = request.params

    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id)
    })

    if(user == null){
      return response.status(404).json({ message: "User not found!" })
    }

    return response.json(user.tickets)
  }

  async buyTicket(request: Request, response: Response, next: NextFunction){
    const { id } = request.params

    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id)
    })

    if(user == null){
      return response.status(404).json({ message: "User not found!" })
    }

    request.body.forEach(async (dataMovie) => {
      if(new Date(dataMovie.session_date) < new Date()){
        return
      }

      await AppDataSource.manager.save(Tickets, {user: {
        id: Number(id)
      }, ...dataMovie});
    });

    return response.json(user)
  }

  async removeTicket(request: Request, response: Response, next: NextFunction){
    AppDataSource.manager.delete(Tickets, {})

    return response.json({message: "foi"})
  }

  async todos(request: Request, response: Response, next: NextFunction){
    const test = AppDataSource.getRepository(Tickets)
    const tickets = await test.find()

    return response.json(tickets)
  }
}

const ticketsController = new TicketsController();
export default ticketsController