import express from 'express'
import 'express-async-errors'

import AuthRouter from './routes/AuthRouter'

const app = express()

app.use('/api/auth', AuthRouter)

export default app
