import express from 'express'
import * as Controller from '../controllers/Schedule'
import CheckJWT from '../middleware/Auth'

const router = express.Router()

router.post('/add-schedule', CheckJWT, Controller.AddSchedule)
router.put('/make-schedule-inactive', CheckJWT, Controller.MakeScheduleInactive)
router.get(
  '/get-schedule-details/:_id',
  CheckJWT,
  Controller.GetScheduleDetails,
)

export default router
