import mysql from '../mysql'
import { createHash } from 'node:crypto'
import { RowDataPacket } from 'mysql2'
import client from '../mqtt'

export default {
  login: async function ({ email, password }: {email:string, password:string}) {
    const hash = createHash('sha256')
    hash.update(password)
    const user = (await mysql.query<RowDataPacket[]>('SELECT * FROM users WHERE email=? AND password=?', [email, hash.digest().toString()]))[0][0]
    if (user) {
      delete user.password
      await client.publish('auth/connection/success', JSON.stringify(user))
    } else {
      await client.publish('auth/connection/fail', JSON.stringify({ email }))
    }
    return user
  }
}
