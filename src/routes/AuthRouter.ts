import express from 'express'
import AuthController from '../controllers/AuthController'
const AuthRouter = express.Router()

AuthRouter.post('/login', express.json(), AuthController.login)

export default AuthRouter
