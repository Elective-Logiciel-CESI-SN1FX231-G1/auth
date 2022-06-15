import express from 'express'
import UserController from '../controllers/UserController'
const UserRouter = express.Router()

UserRouter.post('/', express.json(), UserController.create)

UserRouter.get('/', UserController.getAll)

UserRouter.get('/:id', UserController.getOne)

UserRouter.patch('/:id', express.json(), UserController.modify)

UserRouter.delete('/:id', UserController.remove)

export default UserRouter
