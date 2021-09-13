import { Request, Response, NextFunction } from 'express'
import StudentModel from '../models/Student'

export const getStudentDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.headers
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Id not provided!',
    })
  }
  StudentModel.findById({ _id })
    .then((student) => {
      return res.status(200).json({
        success: true,
        studentDetails: student.getStudentDetails(),
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

export const changeFoodCourt = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.body
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Id not provided!',
    })
  }
  StudentModel.findByIdAndUpdate(
    { _id: req.user._id },
    { foodCourt: _id },
    { new: true },
  )
    .then((updatedStudentDetails) => {
      console.log('Student details updated!')
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

export const verifyStudentAccount = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { emailVerificationToken } = req.params
  if (!emailVerificationToken) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  StudentModel.findByIdAndUpdate(
    { emailVerificationToken },
    { verified: true },
    { new: true },
  )
    .then((student) => {
      console.log('Student verified!')
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

export const checkIfTokenExists = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params
  if (!token) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  StudentModel.findOne({ resetPasswordToken: token })
    .then((student) => {
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

//sending the email;
export const forgotPassword = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {}

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { resetPasswordToken, newPassword } = req.body
  if (!resetPasswordToken || !newPassword) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  StudentModel.findOneAndUpdate(
    { resetPasswordToken },
    { password: newPassword },
    { new: true },
  )
    .then((updatedStudentDetails) => {
      console.log('Student password changed!')
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

export const checkIfStudentVerified = (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.user._id
  StudentModel.findById({ _id })
    .then((student) => {
      return res.status(200).json({
        success: true,
        studentVerified: student.verified,
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
