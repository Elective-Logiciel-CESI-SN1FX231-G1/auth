import type { Server } from 'http'
import { connect as mysqlConnect } from './mysql'
import config from 'config'
import app from './app'
import { connect as mqttConnect } from './mqtt'
let server: Server

export default {
  start: async () => {
    await mysqlConnect()
    console.log('Connected to mysql')
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
