import { Handler } from 'express'
import UserService from '../services/UserService'

export const create: Handler = async (req, res) => {
  try {
    const user = await UserService.addUser(req.body)
    res.send(user)
  } catch (err :any) {
    if (err.message) res.status(400).send(err.message)
    else throw err
  }
}

export const getAll: Handler = async (req, res) => {
  res.send(await UserService.getUsers())
}

export const getOne: Handler = async (req, res) => {
  const user = await UserService.getUser(req.params.id)
  if (user) res.send(user)
  else res.sendStatus(404)
}

export const modify: Handler = async (req, res) => {
  if (req.user._id !== req.params.id) return res.sendStatus(403)
  await UserService.editUser(req.params.id, req.body)
  const updatedUser = await UserService.getUser(req.params.id)
  if (updatedUser) res.send(updatedUser)
  else res.sendStatus(404)
}

export const remove: Handler = async (req, res) => {
  if (req.user._id !== req.params.id) return res.sendStatus(403)
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