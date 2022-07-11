import type { Server } from 'http'
import { connect as connectSequelize } from './sequelize'
import config from 'config'
import app from './app'
import { connect as mqttConnect } from './mqtt'
let server: Server

export default {
  start: async () => {
    await connectSequelize()
    console.log('Connected to sql database')
    await mqttConnect()
    console.log('Connected to mqtt')
    server = app.listen(config.get('http.port'))
    await new Promise(resolve => server.once('listening', resolve))
    console.log(`Http server listening on: ${config.get('http.publicUrl')}`)
  },
  stop: async () => {
    server.close()
    await new Promise(resolve => server.once('close', resolve))
  }
}
