import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import bodyParser = require("body-parser");
import * as crypto from "crypto-js";

interface loginProp {
  email: string
  password: string
}

class UserController {

  async getUsers(request: Request, response: Response, next: NextFunction) {
    const users = await AppDataSource.manager.find(User);
    return response.json(users);
  }

  async getUser(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id),
    });
    return response.json(user);
  }
  
  async authLogin(request: Request, response: Response, next: NextFunction) {
    const auth = await AppDataSource.manager.findOneBy(User, request.body)

    if(auth == null){
      return response.status(404).json({ message: "Login error!" });
    }

    return response.json(auth);
  }


  async saveUser(request: Request, response: Response, next: NextFunction) {
    let bodyData:loginProp = request.body
    bodyData['password'] = crypto.HmacSHA1(bodyData.password, "password").toString()
    const users = await AppDataSource.manager.save(User, request.body);
    console.log(bodyData)
    //return response.json(users);
  }

  async updateUser(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const user = await AppDataSource.manager.update(User, id, request.body);

    if (user.affected == 1) {
      const userUpdated = await AppDataSource.manager.findOneBy(User, {
        id: Number(id),
      });
      return response.json(userUpdated);
    }

    return response.status(404).json({ message: "User not found!" });
  }

  async removeUser(request: Request, response: Response, next: NextFunction){
    const { id } = request.params;
    const user = await AppDataSource.manager.delete(User, {
      id: Number(id)
    });

    if (user.affected == 1) {
      const userRemove = await AppDataSource.manager.findOneBy(User, {
        id: Number(id),
      });
      return response.json(userRemove);
    }

    return response.status(404).json({ message: "User not found!" });
  }

}


const userController = new UserController();
export default userController;
