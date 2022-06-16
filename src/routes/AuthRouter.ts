import express from 'express'
import AuthController, { authNeeded } from '../controllers/AuthController'
const AuthRouter = express.Router()

AuthRouter.post('/login', express.json(), AuthController.login)

AuthRouter.get('/verify', authNeeded, AuthController.verify)

export default AuthRouter
