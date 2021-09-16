import AppFeedbackModel, { AppFeedbackDoc } from '../models/AppFeedback'
import { Request, Response, NextFunction } from 'express'

export const AddFeedback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body as AppFeedbackDoc
  AppFeedbackModel.create(body)
    .then((newFeedback) => {
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

export const GetAllFeedBacksFromUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const _id = req.params._id
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  AppFeedbackModel.find({ from: _id })
    .then((feedbacks) => {
      return res.status(200).json({
        success: true,
        feedbacks,
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
