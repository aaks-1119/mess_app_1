import express from 'express';
import * as Controller from '../controllers/Auth' ;

const router = express.Router();

router.post("/sign-up",Controller.SignUp);
router.post("/sign-in",Controller.SignIn);


export default router;