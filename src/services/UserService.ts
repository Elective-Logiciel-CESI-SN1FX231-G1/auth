import shortid from 'shortid'
import { connection } from '../mysql'
import { createHash } from 'crypto'
import { RowDataPacket } from 'mysql2'
import { User } from '../types'
import client from '../mqtt'

export default {
  async addUser (user: User) {
    if (!user.password) throw new Error("Column 'password' cannot be null")
    const hash = createHash('sha256')
    hash.update(user.password)
    const _id = shortid()
    await connection.query('INSERT INTO users (_id, firstname, lastname, email, password, phone, role) VALUES  (?, ?, ?, ?, ?, ?, ?)',
      [_id, user.firstname, user.lastname, user.email, hash.digest().toString(), user.phone, user.role])
    const newUser = await this.getUser(_id)
    await client.publish('auth/users/new', JSON.stringify(newUser))
    return newUser
  },
  async getUser (_id:string) {
    const user = (await connection.query<RowDataPacket[]>('SELECT _id, firstname, lastname, email, phone, role, ban FROM users WHERE _id=?', [_id]))[0][0]
    return user as User
  },
  async getUsers ({
    pagination, sort
  }:{
    pagination?:{size:number, skip:number},
    sort?:{key:string, direction:string}
  }) {
    const users = (await connection.query<RowDataPacket[]>(`
      SELECT _id, firstname, lastname, email, phone, role, ban 
      FROM users 
      ORDER BY ${sort?.key || '_id'} ${sort?.direction || 'DESC'}
      LIMIT ? OFFSET ?
    `,
    [
      // ,
      pagination?.size || 10, pagination?.skip || 0
    ]))[0]
    const count = (await connection.query<RowDataPacket[]>(`
      SELECT COUNT(*) AS count FROM users
    `))[0][0].count
    return {
      count: count as number,
      users: users as User[]
    }
  },
  async editUser (_id:string, update: any) {
    const updates = Object.entries(update).filter(([key, value]) => ['firstname', 'lastname', 'phone', 'password', 'ban'].includes(key))
    updates.forEach((keyVal) => {
      if (keyVal[0] === 'password') {
        const hash = createHash('sha256')
        hash.update(keyVal[1] as string)
        keyVal[1] = hash.digest().toString()
      }
    })
    if (updates.length) await connection.query(`UPDATE users SET ${updates.map(([key, value]) => key + ' = ? ').join(',')} WHERE _id=?`, updates.map(([key, value]) => value).concat(_id))
    const editedUser = await this.getUser(_id)
    await client.publish('auth/users/edit', JSON.stringify(editedUser))
    return editedUser
  },
  async deleteUser (_id:string) {
    await connection.query('DELETE FROM users WHERE _id=?', [_id])
    await client.publish('auth/users/delete', JSON.stringify([_id]))
  }
}
