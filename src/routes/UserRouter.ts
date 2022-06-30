import express from 'express'
import { authNeeded, restrictedToRoles } from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import paginate from '../utils/pagination'
import sort from '../utils/sort'
const UserRouter = express.Router()

/**
 *
 * @api {GET} /auth/api/users listUsers
 * @apiName listUsers
 * @apiGroup Users
 *
 * @apiSuccess {Number} count The number of users
 * @apiSuccess {Array} results An array of users
 *
 * @apiQuery {Number} size=10 Number of elements per page.
 * @apiQuery {Number} skip=0 Number of elements to skip.
 * @apiQuery {Number} page=1 The page to get.
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     count: 2
 *     results : [
 *          {
 *               "_id": "bqduhadqiusdhi",
 *               "email": "user1@example.com",
 *               "firstname": "user1",
 *               "lastname": "example",
 *               "role": "client",
 *               "phone": "0612345678"
 *          },
 *          {
 *               "_id": "bqdqsdzqdvdfi",
 *               "email": "user2@example.com",
 *               "firstname": "user2",
 *               "lastname": "example",
 *               "role": "deliverer",
 *               "phone": "0622345678"
 *          }
 *     ]
 * }
 *
 *
 */

UserRouter.get('/', restrictedToRoles('commercial'), paginate, sort, UserController.getAll)

/**
 *
 * @api {GET} /auth/api/users/:id getUser
 * @apiName getUser
 * @apiGroup Users
 *
 * @apiParam {String} id User's unique ID.
 *
 *
 * @apiSuccess {Object} user The requested user
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "_id": "bqduhadqiusdhi",
 *     "email": "user1@example.com",
 *     "firstname": "user1",
 *     "lastname": "example",
 *     "role": "client",
 *     "phone": "0612345678"
 * }
 *
 *
 *
 */

UserRouter.get('/:id', UserController.getOne)

/**
 *
 * @api {POST} /auth/api/users/ addUser
 * @apiName addUser
 * @apiGroup Users
 *
 * @apiBody {String} email Email of the user.
 * @apiBody {String} firstname Firstname of the user.
 * @apiBody {String} lastname Lastname of the user.
 * @apiBody {String} role Role of the user.
 * @apiBody {String} phone Phone number of the user.
 *
 * @apiExample
 * {
 *     "email": "user1@example.com",
 *     "firstname": "user1",
 *     "lastname": "example",
 *     "role": "client",
 *     "phone": "0612345678"
 * }
 *
 * @apiSuccess {Object} user The requested user
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "_id": "bqduhadqiusdhi",
 *     "email": "user1@example.com",
 *     "firstname": "user1",
 *     "lastname": "example",
 *     "role": "client",
 *     "phone": "0612345678"
 * }
 *
 *
 *
 */

UserRouter.post('/', express.json(), UserController.create)

/**
 *
 * @api {PATCH} /auth/api/users/:id editUser
 * @apiName editUser
 * @apiGroup Users
 *
 * @apiParam {String} id User's unique ID.
 *
 * @apiBody {String} [email] Email of the user.
 * @apiBody {String} [firstname] Firstname of the user.
 * @apiBody {String} [lastname] Lastname of the user.
 * @apiBody {String} [role] Role of the user.
 * @apiBody {String} [phone] Phone number of the user.
 *
 * @apiExample
 * {
 *     "lastname": "exampleModified",
 *     "role": "deliverer",
 *     "phone": "0687654321"
 * }
 *
 * @apiSuccess {Object} user The requested user
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "_id": "bqduhadqiusdhi",
 *     "email": "user1@example.com",
 *     "firstname": "user1",
 *     "lastname": "exampleModified",
 *     "role": "deliverer",
 *     "phone": "0687654321"
 * }
 *
 *
 *
 */

UserRouter.patch('/:id', authNeeded, express.json(), UserController.modify)

/**
 *
 * @api {DELETE} /auth/api/users/:id deleteUser
 * @apiName deleteUser
 * @apiGroup Users
 *
 * @apiParam {String} id User's unique ID.
 *
 * @apiSuccessExample
 * HTTP/1.1 204 OK
 *
 */

UserRouter.delete('/:id', authNeeded, UserController.remove)

export default UserRouter
