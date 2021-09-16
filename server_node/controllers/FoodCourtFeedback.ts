import { NextFunction, Request, Response } from 'express'
import FoodCourtFeedbackModel, {
  FoodCourtFeedbackDoc,
} from '../models/FoodCourtFeedback'

export const AddFeedback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body as FoodCourtFeedbackDoc
  FoodCourtFeedbackModel.create(body)
    .then((newFeedback) => {
      console.log('New feedback added!')
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

export const GetAllFeedbacksFromStudent = (
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
  FoodCourtFeedbackModel.find({ from: _id })
    .then((feedbacks) => {
      return res.status(200).json({
        success: true,
        feedbacks,
      })
    })
    .catch((err) => {
      console.log('ERROR')
      console.log(err)
    })
}

export const GetAllFeedbacksForFoodCourt = (
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
  FoodCourtFeedbackModel.find({ foodCourt: _id })
    .then((feedbacks) => {
      return res.status(200).json({
        success: true,
        feedbacks,
      })
    })
    .catch((err) => {
      console.log('ERROR')
      console.log(err)
      return res.status(200).json({
        success: false,
        message: 'Unknown server error!',
      })
    })
}
