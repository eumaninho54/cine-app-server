import { Router } from 'express'
import userController from './controller/UserController'
import { check } from 'express-validator'
import favoritesController from './controller/FavoritesController'

const routes = Router()

//GET
routes.get('/users', userController.getUsers)
routes.get('/user/', userController.verifyJWT,userController.getUser)
routes.get('/user/favorite', userController.verifyJWT, favoritesController.getFavorites)
//routes.get('/tickets/:id', ticketsController.getTickets)

//POST
routes.post('/user/new', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8}),
    check("username").not().isEmpty()
] ,userController.saveUser)

routes.post('/user/favorites/new', favoritesController.saveFavorite)

routes.post('/login', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8})
], userController.authLogin)

routes.post('/logout', userController.logout)
//routes.post('/movies', ticketsController.getTickets)

//PUT
routes.put('/user/', userController.verifyJWT, userController.updateUser)

//PATCH
routes.patch('/user/favorite/change/', userController.verifyJWT, favoritesController.updateFavorite)

//DELETE
routes.delete('/user/:id', userController.removeUser)
//routes.delete('/movies/:id', ticketsController.removeAllMovie)


export default routes