import { Handler } from 'express'
import UserService from '../services/UserService'

export const getAll: Handler = async (req, res) => {
  const { count, users } = await UserService.getUsers({
    pagination: req.pagination,
    sort: req.sort
  })
  res.send({
    count,
    results: users
  })
}

export const create: Handler = async (req, res) => {
  if (!['client', 'restaurateur', 'deliverer', 'developer'].includes(req.body.role) && req.user?.role !== 'admin') return res.sendStatus(403)
  try {
    const user = await UserService.addUser(req.body)
    res.send(user)
  } catch (err :any) {
    if (err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const getOne: Handler = async (req, res) => {
  const user = await UserService.getUser(req.params.id)
  if (user) res.send(user)
  else res.sendStatus(404)
}

export const modify: Handler = async (req, res) => {
  if (req.user?._id !== req.params.id && req.user?.role !== 'commercial') return res.sendStatus(403)
  const updatedUser = await UserService.editUser(req.params.id, req.body)
  if (updatedUser) res.send(updatedUser)
  else res.sendStatus(404)
}

export const remove: Handler = async (req, res) => {
  if (req.user?._id !== req.params.id && req.user?.role !== 'commercial') return res.sendStatus(403)
  await UserService.deleteUser(req.params.id)
  res.sendStatus(204)
}

export default {
  create,
  getAll,
  getOne,
  modify,
  remove
}
