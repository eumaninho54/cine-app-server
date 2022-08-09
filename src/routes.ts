import { Router } from 'express'
import userController from './controller/UserController'
import ticketsController from './controller/TicketsController'
import { check } from 'express-validator'

const routes = Router()

//GET
routes.get('/users', userController.getUsers)
routes.get('/user/', userController.verifyJWT,userController.getUser)
routes.get('/user/favorite', userController.verifyJWT, ticketsController.getFavorites)
routes.get('/user/ticket', userController.verifyJWT, ticketsController.getTickets)

//POST
routes.post('/user/new', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8}),
    check("username").not().isEmpty()
] ,userController.saveUser)

routes.post('/user/favorites/new', ticketsController.saveFavorite)

routes.post('/login', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8})
], userController.authLogin)

routes.post('/logout', userController.logout)

routes.post('/user/ticket/buy', userController.verifyJWT, ticketsController.buyTicket)

//PUT
routes.put('/user/', userController.verifyJWT, userController.updateUser)

//PATCH
routes.patch('/user/favorite/change/', userController.verifyJWT, ticketsController.updateFavorite)

//DELETE
routes.delete('/user/:id', userController.removeUser)


export default routes