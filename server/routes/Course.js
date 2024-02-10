const express = require("express");
const router = express.Router();

  const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
  } = require("../controllers/Course")

  const { updateCourseProgress } = require("../controllers/courseProgress");

const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth")

const {createSection, updateSection, deleteSection} = require("../controllers/Section");
const {createSubsection, updateSubsection, deleteSubsection} = require("../controllers/Subsection");
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category");
const {createRating, getAverageRating, getAllRating, getAllCourseRating} = require("../controllers/RatingAndReview");

router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getallCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", deleteCourse)
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

router.post("/addSubSection", auth, isInstructor, createSubsection);
router.post("/updateSubSection", auth, isInstructor, updateSubsection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection);

router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);
router.get("/showAllCategories", showAllCategories);

router.post("/createRating",  auth, isStudent, createRating);
router.post("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);
router.post("/getAllCourseRating", getAllCourseRating);


module.exports = router;