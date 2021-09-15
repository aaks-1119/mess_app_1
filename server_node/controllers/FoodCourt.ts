import { Request, Response, NextFunction } from 'express'
import FoodCourtModel, { FoodCourtDoc } from '../models/FoodCourt'
import ScheduleImage from '../models/ScheduleImage'

export const GetCurrentScheduleForFoodCourt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.params
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }

  FoodCourtModel.findById({ _id })
    .then((foodCourt) => {
      return res.status(200).json({
        success: true,
        scheduleId: foodCourt.currentSchedule,
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

export const AddFoodCourt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const body = req.body as FoodCourtDoc
  FoodCourtModel.create(body)
    .then((newFoodCourt) => {
      console.log('Food court added!')
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

export const GetFoodCourtDetails = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.params
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  FoodCourtModel.findById({ _id })
    .then((foodCourt) => {
      return res.status(200).json({
        success: true,
        foodCourt,
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

export const ChangeFoodCourtSchedule = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id, scheduleId } = req.body
  if (!_id || !scheduleId) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  try {
    const foodCourt = await FoodCourtModel.findById({ _id })
    const previous = foodCourt.currentSchedule
    const previousSchedule = await ScheduleImage.findById({ _id: previous })
    previousSchedule.active = false
    await previousSchedule.save()
    foodCourt.currentSchedule = scheduleId
    await foodCourt.save()
    return res.status(200).json({
      success: true,
    })
  } catch (err) {
    console.log('ERROR')
    console.log(err)
    return res.status(500).json({
      success: false,
      message: 'Unknown server error!',
    })
  }
}
