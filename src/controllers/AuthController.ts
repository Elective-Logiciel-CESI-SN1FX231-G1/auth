import { Handler } from 'express'
import AuthService from '../services/AuthService'
import JSONWebTokenService from '../services/JSONWebTokenService'
import UserService from '../services/UserService'
import { User, Role } from '../types'

declare module 'express-serve-static-core' {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    user?: User
  }
}

export const login: Handler = async function (req, res) {
  if (!req.body.password) return res.status(400).send()
  if (!req.body.email) return res.status(400).send()
  const user = await AuthService.login(req.body)
  if (!user) return res.status(400).send()
  const token = JSONWebTokenService.sign(user)
  res.send({
    user,
    token
  })
}

export const auth: Handler = async function (req, res, next) {
  if (!req.headers.authorization?.startsWith('Bearer ')) return next()
  const token = req.headers.authorization.substring(7)
  try {
    const jwtUser = JSONWebTokenService.verify(token) as User
    const user = await UserService.getUser(jwtUser._id)
    if (!user || user.ban) return res.sendStatus(401)
    req.user = user
    return next()
  } catch (error) {
    return res.status(401).send('invalid jwt signature')
  }
}

export const authNeeded: Handler = function (req, res, next) {
  if (!req.user) return res.sendStatus(401)
  return next()
}

export const restrictedToRoles = function (roles: Role | Array<Role>) : Handler {
  const authorizedRoles = [roles].flat()
  return async function (req, res, next) {
    if (!req.user) return res.sendStatus(401)
    if (!authorizedRoles.includes(req.user.role)) return res.sendStatus(403)
    return next()
  }
}

export const verify: Handler = function (req, res) {
  if (!req.user) return res.sendStatus(401)
  res.send(req.user)
}

export const refresh: Handler = function (req, res) {
  if (!req.user) return res.sendStatus(401)
  const token = JSONWebTokenService.sign(req.user)
  res.send({
    user: req.user,
    token
  })
}

export default {
  login,
  verify,
  auth,
  authNeeded,
  restrictedToRoles,
  refresh
}
