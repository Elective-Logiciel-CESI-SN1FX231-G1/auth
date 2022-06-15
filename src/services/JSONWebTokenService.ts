import jwt from 'jsonwebtoken'
import config from 'config'
import fs from 'node:fs'

const privateKey = config.has('jwt.privateKeyFile') ? fs.readFileSync(config.get('jwt.privateKeyFile')) : config.get<string>('jwt.secret')
const publicKey = config.has('jwt.publicKeyFile') ? fs.readFileSync(config.get('jwt.publicKeyFile')) : config.get<string>('jwt.secret')

export default {
  sign: function (payload: string | Buffer | object) {
    return jwt.sign(payload, privateKey, { algorithm: config.get('jwt.algorithm') })
  }
}
