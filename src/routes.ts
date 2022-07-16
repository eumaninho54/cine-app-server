import { Request, Response, Router } from 'express'
import userController from './controller/UserController'
import ticketsController from './controller/TicketsController'
import { check } from 'express-validator'

const routes = Router()

//GET
routes.get('/', userController.welcome)
routes.get('/users', userController.getUsers)
routes.get('/user', userController.verifyJWT,userController.getUser)
//routes.get('/tickets/:id', ticketsController.getTickets)

//POST
routes.post('/user/new', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8}),
    check("username").not().isEmpty()
] ,userController.saveUser)

routes.post('/login', [
    check("email").not().isEmpty().isEmail(),
    check("password").not().isEmpty().isLength({min: 8})
], userController.authLogin)

routes.post('/logout', userController.logout)
//routes.post('/movies', ticketsController.getTickets)

//PUT
routes.put('/users/:id', userController.updateUser)

//DELETE
routes.delete('/users/:id', userController.removeUser)
//routes.delete('/movies/:id', ticketsController.removeAllMovie)


export default routes