import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Favorites } from "../entity/Favorites";
import { Tickets } from "../entity/Tickets";
import { User } from "../entity/User";
require("dotenv").config();

class FavoritesController {
  async getFavorites(request: Request, response: Response, next: NextFunction){
    const { id } = request.params

    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id)
    })

    if(user == null){
      return response.status(404).json({ message: "User not found!" })
    }

    return response.json({
      favorites: user.favorites
    })
  }

  async saveFavorite(request: Request, response: Response, next: NextFunction){
    const user = await AppDataSource.manager.save(Favorites, request.body);
    return response.json(user);
  }

  async updateFavorite(request: Request, response: Response, next: NextFunction){
    const { id } = request.params
    const { isSelected, dataMovie } = request.body
    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id)
    })
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


}

const favoritesController = new FavoritesController();
export default favoritesController;
