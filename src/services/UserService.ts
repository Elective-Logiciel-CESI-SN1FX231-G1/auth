import shortid from 'shortid'
import { createHash } from 'crypto'
import client from '../mqtt'
import UserModel from '../models/UserModel'

export default {
  async addUser (user: any) {
    if (!user.password) throw new Error("Column 'password' cannot be null")
    const hash = createHash('sha256')
    hash.update(user.password)
    user._id = shortid()
    const newUser = await UserModel.create(user)
    await client.publish('auth/users/new', JSON.stringify(newUser))
    return newUser
  },
  async getUser (_id:string) {
    const user = await UserModel.findOne({where:{_id}})
    return user
  },
  async getUsers ({
    pagination, sort
  }:{
    pagination?:{size:number, skip:number},
    sort?:{key:string, direction:string}
  }) {
    const users = await UserModel.findAndCountAll({
      order: sort? [sort.key,sort.direction] : [],
      limit: pagination?.size || 0,
      offset: pagination?.skip || 0
    })
    return {
      count: users.count,
      users: users.rows
    }
  },
  async editUser (_id:string, update: any) {
    const user = await this.getUser(_id)
    if(!user) return null
    if(update.firstname) user.firstname = update.firstname
    if(update.lastname) user.lastname = update.lastname
    if(update.phone) user.phone = update.phone
    if(update.ban) user.ban = update.ban
    if(update.password){
      const hash = createHash('sha256')
      hash.update(update.password as string)
      user.password = hash.digest().toString()
    }
    return await user.save()
  },
  async deleteUser (_id:string) {
    (await this.getUser(_id))?.destroy()
  }
}
