import shortid from 'shortid'
import { connection } from '../mysql'
import { createHash } from 'crypto'
export default {
  async addUser (user: any) {
    const hash = createHash('sha256')
    hash.update(user.password || shortid())
    await connection.query(`INSERT INTO users (_id, firstname, lastname, email, password, phone, role)
    VALUES  (?, ?, ?, ?, ?, ?, ?)
    `, [shortid(), user.firstname, user.lastname, user.email, hash.digest().toString(), user.phone, user.role])
  }
}
