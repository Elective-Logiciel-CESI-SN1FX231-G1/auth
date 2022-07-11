import config from 'config'
import shortid from 'shortid'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(config.get('sql.url'))

export default sequelize

import UserService from './services/UserService'

export async function connect () {
  await sequelize.sync()
  if (config.has('auth.defaultUsers')) {
    for (const user of config.get<Array<any>>('auth.defaultUsers')) {
      try {
        await UserService.addUser(Object.assign({ password: shortid() }, user))
      } catch (error: any) {
        if (!('original' in error && 'code' in error.original && error.original.code === 'ER_DUP_ENTRY')) throw error
      }
    }
  }
}
