import mysql, { ConnectionOptions } from 'mysql2'
import config from 'config'
import UserService from './services/UserService'

export const connection = mysql.createConnection({
  host: config.get('mysql.host'),
  user: config.get('mysql.user'),
  password: config.get('mysql.password')
} as ConnectionOptions).promise()

export async function connect () {
  await connection.connect()
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.get('mysql.database')};`)
  await connection.query(`USE ${config.get('mysql.database')};`)
  await connection.query(`CREATE TABLE IF NOT EXISTS users (
    _id         VARCHAR(255) NOT NULL,
    firstname   VARCHAR(255) NOT NULL,
    lastname    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL,
    password    VARCHAR(255) NOT NULL,
    phone       VARCHAR(255) NOT NULL,
    role        ENUM('client', 'restaurateur', 'deliverer', 'developer', 'commercial', 'technician', 'admin') NOT NULL,
    PRIMARY KEY (_id),
    UNIQUE (email)
  );`)
  if (config.has('auth.defaultUsers')) {
    for (const user of config.get<Array<Object>>('auth.defaultUsers')) {
      try {
        await UserService.addUser(user)
      } catch (error: any) {
        if (!('code' in error && error.code === 'ER_DUP_ENTRY')) throw error
      }
    }
  }
}

export default connection
