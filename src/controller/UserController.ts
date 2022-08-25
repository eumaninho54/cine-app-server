import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import * as crypto from "crypto-js";
import { validationResult } from "express-validator";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

class UserController {
  async getUsers(request: Request, response: Response, next: NextFunction) {
    const appDataSource = AppDataSource.getRepository(User);
    const users = await appDataSource.find();

    return response.json(users);
  }

  async getUser(request: Request, response: Response, next: NextFunction) {
    const { id, token } = request.params;

    const user = await AppDataSource.manager.findOneBy(User, {
      id: Number(id),
    });

    if (user == null) {
      return response.status(404).json({ message: "User not found!" });
    }

    return response.json({
      id: user.id,
      username: user.username,
      email: user.email,
      favorites: user.favorites,
      token: token,
      auth: true,
    });
  }

  async authLogin(request: Request, response: Response, next: NextFunction) {
    if (!validationResult(request).isEmpty()) {
      return response.status(404).json({ message: "Invalid data!" });
    }

    const auth = await AppDataSource.manager.findOneBy(User, {
      email: request.body["email"].toLowerCase(),
      password: crypto
        .HmacSHA1(request.body["password"], "password")
        .toString(),
    });

    if (auth == null) {
      return response.status(404).json({ message: "Login error!" });
    }

    const token = jwt.sign({ id: auth.id }, process.env.SECRET, {});

    return response.json({
      id: auth.id,
      username: auth.username,
      email: auth.email,
      favorites: auth.favorites,
      auth: true,
      token: token,
    });
  }

  async logout(request: Request, response: Response, next: NextFunction) {
    return response.json({ auth: false, token: null });
  }

  async verifyJWT(request: Request, response: Response, next: NextFunction) {
    const token = request.header("x-access-token");
    if (!token)
      return response
        .status(401)
        .json({ auth: false, message: "No token provided!" });

    jwt.verify(token, process.env.SECRET, (err, decoded: any) => {
      if (err)
        return response
          .status(500)
          .json({ auth: false, message: "Failed to authenticate token!" });

      request.params.id = decoded.id;
      request.params.token = token;
      next();
    });
  }

  async saveUser(request: Request, response: Response, next: NextFunction) {
    if (!validationResult(request).isEmpty()) {
      return response.status(404).json({ message: "Invalid data!" });
    }

    if (
      (await AppDataSource.manager.findOneBy(User, {
        email: request.body["email"],
      })) != null
    ) {
      return response
        .status(404)
        .json({ message: "E-mail already registered!" });
    }

    request.body["password"] = crypto
      .HmacSHA1(request.body["password"], "password")
      .toString();
    request.body["email"] = request.body["email"].toLowerCase();

    const user = await AppDataSource.manager.save(User, {
      ...request.body,
      tickets: [],
      favorites: [],
    });
    return response.json(user);
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

  async removeUser(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const user = await AppDataSource.manager.delete(User, {
      id: Number(id),
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
