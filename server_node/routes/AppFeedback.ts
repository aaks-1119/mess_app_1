import express from "express";
import CheckJWT from '../middleware/Auth';
import * as Controller from '../controllers/AppFeedback';


const router = express.Router();

router.post('/add-feedback',CheckJWT,Controller.AddFeedback)
router.get('/get-all-feedbacks-from-user/:_id',CheckJWT,Controller.GetAllFeedBacksFromUser);

export default router;