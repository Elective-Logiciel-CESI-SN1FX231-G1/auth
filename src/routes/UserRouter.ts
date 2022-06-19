import express from 'express'
import { authNeeded, restrictedToRoles } from '../controllers/AuthController'
import UserController from '../controllers/UserController'
import paginate from '../utils/pagination'
import sort from '../utils/sort'
const UserRouter = express.Router()

/**
 *
 * @api {GET} /api/users listUsers
 * @apiName listUsers
 * @apiGroup Users
 *
 * @apiSuccess (200) {number} count The number of users
 * @apiSuccess (200) {Object[]} results An array of users
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     count: 2
 *     results : [
 *          {
 *               "_id": "bqduhadqiusdhi"
 *               "email": "user1@example.com",
 *               "firstname": "user1",
 *               "lastname": "example",
 *               "role": "client",
 *               "phone": "0612345678"
 *          },
 *          {
 *               "_id": "bqdqsdzqdvdfi"
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
 * @api {GET} /api/users/:id getUser
 * @apiName getUser
 * @apiGroup Users
 *
 * @apiParam {String} id Unique ID of the user.
 *
 *
 * @apiSuccess (200) {Object} user The requested user
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "_id": "bqduhadqiusdhi"
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

UserRouter.post('/', express.json(), UserController.create)

UserRouter.patch('/:id', authNeeded, express.json(), UserController.modify)

UserRouter.delete('/:id', authNeeded, UserController.remove)

export default UserRouter
