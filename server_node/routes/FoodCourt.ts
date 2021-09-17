const express = require('express');
import * as Controller from '../controllers/FoodCourt'
import CheckJWT from '../middleware/Auth'

const router = express.Router()

router.get(
  '/get-current-schedule-for-food-court/:_id',
  CheckJWT,
  Controller.GetCurrentScheduleForFoodCourt,
)
router.post('/add-food-court', CheckJWT, Controller.AddFoodCourt)
router.get(
  '/get-food-court-details/:_id',
  CheckJWT,
  Controller.GetFoodCourtDetails,
)
router.put(
  '/change-food-court-schedule',
  CheckJWT,
  Controller.ChangeFoodCourtSchedule,
)

export  {router as FoodCourtRoutes}
