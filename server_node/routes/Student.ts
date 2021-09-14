import express from 'express'
import * as Controller from '../controllers/Student'
import CheckJWT from '../middleware/Auth'

const router = express.Router()


router.get('/get-student-details',CheckJWT,Controller.GetStudentDetails);
router.put("/change-food-court",CheckJWT,Controller.ChangeFoodCourt);
router.get('/verify-student-account/:emailVerificationToken',Controller.VerifyStudentAccount);
router.get("/check-if-token-exists/:token",Controller.CheckIfTokenExists);
router.post('/forgot-password',Controller.ForgotPassword);
router.put("/reset-password",CheckJWT,Controller.ResetPassword);
router.get('/check-if-student-verified',CheckJWT,Controller.CheckIfStudentVerified)




export default router
