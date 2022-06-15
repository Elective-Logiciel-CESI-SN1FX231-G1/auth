import express from 'express'
import { authNeeded, restrictedToRoles } from '../controllers/AuthController'
import UserController from '../controllers/UserController'
const UserRouter = express.Router()

UserRouter.post('/', express.json(), UserController.create)

UserRouter.get('/', restrictedToRoles('commercial'), UserController.getAll)

UserRouter.get('/:id', UserController.getOne)

UserRouter.patch('/:id', authNeeded, express.json(), UserController.modify)

UserRouter.delete('/:id', authNeeded, UserController.remove)

export default UserRouter
