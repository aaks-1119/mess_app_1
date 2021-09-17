import { NextFunction, Response } from 'express'
const jwt = require('jsonwebtoken');

const CheckJWT =  (req: any, res: Response, next: NextFunction) =>{
  // get token from the header
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorozition denied' })
  }

  try {
    const decode: any = jwt.verify(token, process.env.JWT_TOKEN_KEY)
    req.user = decode.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}

export default CheckJWT;