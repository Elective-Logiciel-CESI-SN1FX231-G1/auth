import express from 'express'
import 'express-async-errors'

import AuthRouter from './routes/AuthRouter'
import UserRouter from './routes/UserRouter'

const app = express()

app.use('/api/users', UserRouter)
app.use('/api/auth', AuthRouter)

export default app
