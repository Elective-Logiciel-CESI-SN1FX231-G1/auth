import { Handler } from 'express'

declare module 'express-serve-static-core' {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    sort?: {
      key: string,
      direction: string
    }
  }
}

export const sort: Handler = (req, res, next) => {
  if (req.query.sort) {
    const [key, value] = (req.query.sort as string).split(':')
    if (!value || value === '1' || value.toLowerCase() === 'asc') req.sort = { key, direction: 'ASC' }
    else req.sort = { key, direction: 'DESC' }
  }

  next()
}

export default sort
