import { Handler } from 'express'
import AuthService from '../services/AuthService'
import JSONWebTokenService from '../services/JSONWebTokenService'
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
  // res.cookie('auth', jwt)
  res.send({
    user,
    token
  })
}

export const auth: Handler = function (req, res, next) {
  if (!req.headers.authorization?.startsWith('Bearer ')) return next()
  const token = req.headers.authorization.substring(7)
  try {
    const user = JSONWebTokenService.verify(token)
    req.user = user as User
    return next()
  } catch (error) {
    return res.status(400).send('invalid jwt signature')
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

export default {
  login,
  verify,
  auth,
  authNeeded,
  restrictedToRoles
}
