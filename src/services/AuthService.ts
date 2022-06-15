import mysql from '../mysql'
import { createHash } from 'node:crypto'
import { RowDataPacket } from 'mysql2'

export default {
  login: async function ({ email, password }: {email:string, password:string}) {
    const hash = createHash('sha256')
    hash.update(password)
    const user = (await mysql.query<RowDataPacket[]>('SELECT * FROM users WHERE email=? AND password=?', [email, hash.digest().toString()]))[0][0]
    delete user.password
    return user
  }
}
