import { Handler } from 'express'
import AuthService from '../services/AuthService'
import JSONWebTokenService from '../services/JSONWebTokenService'

export const login: Handler = async function (req, res) {
  if (!req.body.password) return res.status(400).send()
  if (!req.body.email) return res.status(400).send()
  const user = await AuthService.login(req.body)
  const jwt = JSONWebTokenService.sign(user)
  res.cookie('auth', jwt)
  res.send(user)
}

export default {
  login
}
