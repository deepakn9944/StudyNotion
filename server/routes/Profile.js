const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth")

const {updateProfile, 
    getAllUserDetails,
    deleteAccount, 
    updateDisplayPicture, 
    getEnrolledCourses,
    instructorDashboard} = require("../controllers/Profile");

router.put('/updateProfile', auth, updateProfile);
router.put('/updateDisplayPicture', auth, updateDisplayPicture);

router.delete('/deleteProfile', auth, deleteAccount);
router.get('/getAllUserDetails', auth, getAllUserDetails);
router.get('/getEnrolledCourses', auth, getEnrolledCourses);
router.get('/instructorDashboard', auth, isInstructor, instructorDashboard);

module.exports = router;