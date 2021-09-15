import ScheduleImage from '../models/ScheduleImage'
import ScheduleDetails from '../models/ScheduleDetails'
import { Request, Response, NextFunction } from 'express'

export const AddSchedule = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { scheduleImage, scheduleDetails } = req.body
  if (!scheduleImage || !scheduleDetails) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided',
    })
  }
  ScheduleDetails.create(scheduleDetails).then((newSchedule) => {
    ScheduleImage.create({ ...scheduleImage, details: newSchedule._id })
      .then((s) => {
        console.log('new schedule made!')
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
  })
}

export const MakeScheduleInactive = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { _id } = req.headers
  if (!_id) {
    return res.status(500).json({
      success: false,
      message: 'Required values not provided!',
    })
  }
  ScheduleImage.findByIdAndUpdate({ _id }, { active: false })
    .then((s) => {
      console.log('Schedule made inactive!')
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

export const GetScheduleDetails = (
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
  ScheduleImage.findById({ _id })
    .then((scheduleImage) => {
      ScheduleDetails.findById({ _id: scheduleImage.details })
        .then((scheduleDetails) => {
          return res.status(200).json({
            success: true,
            scheduleImage,
            scheduleDetails,
          })
        })
        .catch((err) => {
          console.log('error fetching schedule details')
          console.log(err)
          return res.status(500).json({
            success: false,
            message: 'Unknown server error!',
          })
        })
    })
    .catch((err) => {
      console.log('error fetching schedule image')
      console.log(err)
      return res.status(500).json({
        success: false,
        message: 'Unknown server error!',
      })
    })
}
