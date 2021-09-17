import StudentModel, { StudentDoc } from '../models/Student'
import { Request, Response, NextFunction } from 'express'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import GenerateHash from '../services/GenerateHash'
import {SendWelcomeMail} from '../middleware/Mailer'

export const SignUp = (req: Request, res: Response, next: NextFunction) => {
  const {
    learnerId,
    registrationNumber,
    college,
    foodCourt,
    password,
  } = req.body
  if (
    !learnerId ||
    !registrationNumber ||
    !college ||
    !foodCourt ||
    !password
  ) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  const emailVerificationToken = GenerateHash(20)
  StudentModel.create({
    learnerId,
    registrationNumber,
    college,
    foodCourt,
    password,
    emailVerificationToken,
  })
    .then((newStudent) => {
      SendWelcomeMail(learnerId, emailVerificationToken)
      return res.status(200).json({
        success: true,
      })
    })
    .catch((err) => {
      console.log('ERROR')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!',
      })
    })
}

export const SignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  const emailCheck = await StudentModel.find({ learnerId: email })
  if (emailCheck.length === 0) {
    return res.status(500).json({
      success: false,
      message: 'Email does not exist!',
    })
  }
  const User = emailCheck[0]
  bcrypt.compare(password, User.password, (err, doesExist) => {
    if (err) {
      console.log('ERROR')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!',
      })
    }
    if (doesExist) {
      const payload = {
        _id: User._id,
        learnerId: User.learnerId,
      }
      const token = jwt.sign(payload, process.env.JWT_TOKEN_KEY, {
        expiresIn: '5h',
      })
      return res.status(200).json({
        success: true,
        token,
      })
    } else {
      return res.status(500).json({
        success: false,
        message: 'Not authenticated!',
      })
    }
  })
}
