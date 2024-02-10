const express = require('express');
const router = express.Router();

const {signUp, login, sendOTP, changePassword} = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");


router.post('/signup', signUp);
router.post('/login', login);
router.post('/sendOTP', sendOTP);
router.post('/changePassword', auth, changePassword);



// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)
module.exports = router;