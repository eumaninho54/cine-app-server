import { Request, Response, Router } from 'express'
import userController from './controller/UserController'
import { check } from 'express-validator'

const routes = Router()

//GET
routes.get('/users', userController.getUsers)
routes.get('/user', userController.verifyJWT,userController.getUser)


//POST
routes.post('/user/new', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8})
] ,userController.saveUser)

routes.post('/login', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8})
], userController.authLogin)

routes.post('/logout', userController.logout)


//PUT
routes.put('/users/:id', userController.updateUser)


//DELETE
routes.delete('/users/:id', userController.removeUser)


export default routes