import express from 'express'
import AuthController, { authNeeded } from '../controllers/AuthController'
const AuthRouter = express.Router()

/**
 *
 * @api {POST} /auth/api/auth/ loginUser
 * @apiName loginUser
 * @apiGroup Auth
 *
 * @apiBody {String} email Email of the user.
 * @apiBody {String} password Password of the user.
 *
 * @apiExample
 * {
 *     "email": "user1@example.com",
 *     "password": "Azertyuiop123"
 * }
 *
 * @apiSuccess {Object} user The requested user.
 * @apiSuccess {Object} token The user's token.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "user":
 *     {
 *          "_id": "bqduhadqiusdhi",
 *          "email": "user1@example.com",
 *          "firstname": "user1",
 *          "lastname": "example",
 *          "role": "client",
 *          "phone": "0612345678"
 *     }
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 *
 *
 *
 */

AuthRouter.post('/login', express.json(), AuthController.login)

/**
 *
 * @api {POST} /auth/api/auth/ Verify User's connection
 * @apiName verifyUser
 * @apiGroup Auth
 *
 * @apiBody {Object} user The user to verify.
 *
 * @apiExample
 * {
 *          "email": "user1@example.com",
 *          "firstname": "user1",
 *          "lastname": "example",
 *          "role": "client",
 *          "phone": "0612345678"
 * }
 *
 * @apiSuccess {Object} user The verified user.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      "_id": "bqduhadqiusdhi",
 *      "email": "user1@example.com",
 *      "firstname": "user1",
 *      "lastname": "example",
 *      "role": "client",
 *      "phone": "0612345678"
 * }
 *
 *
 *
 */

AuthRouter.get('/verify', authNeeded, AuthController.verify)

export default AuthRouter
