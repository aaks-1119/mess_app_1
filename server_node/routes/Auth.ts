const express = require('express');
import * as Controller from '../controllers/Auth' ;

const router = express.Router();

router.post("/sign-up",Controller.SignUp);
router.post("/sign-in",Controller.SignIn);


export {router as AuthRoutes};