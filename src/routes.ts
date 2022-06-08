import { Request, Response, Router } from 'express'
import userController from './controller/UserController'

const routes = Router()

//GET
routes.get('/users', userController.getUsers)
routes.get('/users/:id', userController.getUser)

//POST
routes.post('/users', userController.saveUser)
routes.get('/login', userController.authLogin)

//PUT
routes.put('/users/:id', userController.updateUser)

//DELETE
routes.delete('/users/:id', userController.removeUser)


export default routes