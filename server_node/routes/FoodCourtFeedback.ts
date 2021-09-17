const express = require('express');
import CheckJWT from '../middleware/Auth'
import * as Controller from '../controllers/FoodCourtFeedback'
const router = express.Router()


router.post('/add-feedback', CheckJWT, Controller.AddFeedback)
router.get(
  '/get-all-feedbacks-from-student/:_id',
  CheckJWT,
  Controller.GetAllFeedbacksFromStudent,
)
router.get(
  '/get-all-feedbacks-for-food-court/:_id',
  CheckJWT,
  Controller.GetAllFeedbacksForFoodCourt,
)

export {router as FoodCourtFeedbackRoutes}
