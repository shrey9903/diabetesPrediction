// const formController = require('../controllers/formController.js');
import formHandle  from '../controllers/formController.js';
import loginController  from '../controllers/loginController.js';

import express from "express";
const router = express.Router();
router.route("/registration").post(formHandle);
router.route("/login").post(loginController);

export default router;