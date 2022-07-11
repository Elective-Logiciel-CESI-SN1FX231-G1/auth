import mysql from '../sequelize'
import { createHash } from 'node:crypto'
import { RowDataPacket } from 'mysql2'
import client from '../mqtt'
import UserModel from '../models/UserModel'

export default {
  login: async function ({ email, password }: {email:string, password:string}) {
    const hash = createHash('sha256')
    hash.update(password)
    const user = await UserModel.findOne({where:{email,password:hash}})
    if (user) {
      delete user.password
      await client.publish('auth/connection/success', JSON.stringify(user))
    } else {
      await client.publish('auth/connection/fail', JSON.stringify({ email }))
    }
    return user
  }
}
