import express from 'express'
import 'express-async-errors'
import { auth } from './controllers/AuthController'

import AuthRouter from './routes/AuthRouter'
import UserRouter from './routes/UserRouter'

const app = express()

app.use(auth)

app.use('/api/users', UserRouter)
app.use('/api/auth', AuthRouter)

export default app
