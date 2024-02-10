const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section')
const SubSection = require('../models/SubSection')
const {uploadFileToCloudinary} = require("../utils/filesUploader");
const CourseProgress = require("../models/CourseProgress")
require("dotenv").config();
const { convertSecondsToDuration } = require("../utils/secToDuration");


/* -------------------- create course handler function -------------------- */

exports.createCourse = async(req, res) => {
    try{
        //data fetch
        const userId = req.user.id;
        //console.log(req.body);
        let {courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag: _tag,
            category,
            status,
            instructions:  _instructions} = req.body;

        const thumbnail = req.files.thumbnailImage;

          // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)
        //validation
        if(!courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price  || 
            !tag.length ||
            !thumbnail || 
            !instructions.length ||
            !category){
            return res.status(400).json({
                success: false,
                message:"Please fill all fields"
            })
        }

        if (!status || status === undefined) {
			status = "Draft";
		}


       
        //check for Instructor
        
        const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});
       // console.log("Instructor Details: ", instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message:"Instructor Details not found"
            })
        }

        //category is valid or not

        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message:"Category Details not found"
            });
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //entry create for new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail:thumbnailImage.secure_url,
            status: status,
			instructions: instructions,
        })

        //add new course to user schema of Instructor

        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            }, 
            {new: true}
            )

        //category schema updated    
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true},
        )    

        return res.status(200).json({
            success: true,
            message: 'Course Created Successfully',
            data: newCourse
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Failed to create course, Please Try Again"
        })

    }
}

/* -------------------- create course handler function -------------------- */


/* -------------------- GetAllCourses handler function -------------------- */

exports.getAllCourses = async(req, res) => {
    try{
        //fetch data of all courses
        const allCourses = await Course.find({status: "Published" }, {
            courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentEnrolled:true,
        }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: 'Courses details are fetched Successfully',
            data: allCourses
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Failed to fetch courses, Please Try Again"
        })
    }
}

/* -------------------- GetAllCourses handler function -------------------- */

/* ------------------------- Complete Course Detail ------------------------- */

exports.getCourseDetails = async(req, res) => {
    try{
        //data fetch
        const {courseId} = req.body;
        
        //get course detail
        const courseDetails = await Course.findOne({_id: courseId}).populate(
            {path: 'instructor',
            populate:{
                path:"additionalDetails",
            },
             })
             .populate("ratingAndReviews")
             .populate("category")
             .populate({
                path:'courseContent',
                populate:{
                    path:"subSection",
                    select: "-videoUrl",
                },
             })
             .exec();
             //console.log("hey", );

        
        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:'No such course present'
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            }) 
        })

       const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

         //return response
         return res.status(200).json({
            success:true,
            message:"Course Details fetched successfully",
            data:{
                courseDetails,
                totalDuration,
            },
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Failed to fetch courses, Please Try Again"
        })

    }
    

}
/* ------------------------- Complete Course Detail ------------------------- */

/* --------------------------- Edit Course Details -------------------------- */

exports.editCourse = async (req, res) => {
    try{
        
        const {courseId} = req.body;
       // console.log("here are details",courseId);
        const updates = req.body;
        const course = await Course.findById({_id: courseId});

        if(!course){
            return res.status(400).json({
                error: 'Course not found'
            })
        }

        //  If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadFileToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }
        
        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
                course[key] = JSON.parse(updates[key])
            } else {
                course[key] = updates[key]
            }
            }
        }

        await course.save();

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
            })
            .exec()
            console.log(updatedCourse)

            res.status(200).json({
                success: true,
                message: "Course updated successfully",
                data: updatedCourse,
            })
        }catch (error) {
            console.error(error)
            res.status(500).json({
            success: false,
            message: "Internal server error",
            })
        }
}


/* --------------------------- Edit Course Details -------------------------- */

/* --------------------------- Full Course Detail --------------------------- */


exports.getFullCourseDetails = async(req, res) => {
    try{
        const {courseId} = req.body;
        const userId = req.user.id;
        console.log(courseId);
        
        const courseDetails = await Course.findOne({
            _id: courseId
        }).populate({
            path: "instructor",
            populate:{
                path: "additionalDetails"
            },
        }).populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate:{
                path: "subSection",
            },
        }).exec()


        if(!courseDetails){
            res.status(400).json({
                success:false,
                message: `could not find course with id: ${courseId}`,
            })
        }
    
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
          })

          const videoCompleteDetails = courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [];

        return res.status(200).json({
            success: true,
            data: {
              courseDetails,
              totalDuration,
              completedVideos: videoCompleteDetails,
            },
          })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })

    }
}

/* --------------------------- Full Course Detail --------------------------- */


/* ---------------------- List of Courses of Instructor --------------------- */


exports.getInstructorCourses = async(req, res) => {
    try{

        const instructorId = req.user.id

          // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({instructor: instructorId})
        .sort({createdAt: -1 })

        res.status(200).json({
            success: true,
            data: instructorCourses,
          })
    }catch(error){
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Failed to retrieve instructor courses",
          error: error.message,
        })

    }
}

/* ---------------------- List of Courses of Instructor --------------------- */


/* ------------------------------ Delete Course ----------------------------- */


exports.deleteCourse = async(req, res) => {
    try{
        const {courseId} = req.body

        // Find the course
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({ message: "Course not found" })
        }

        //unenroll students from the course
        const studentsEnrolled = course.studentEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull:{courses: courseId}
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for(const sectionId of courseSections){
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if(section){
                const subSections = section.subSection
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            // Delete the section
            await Section.findByIdAndUpdate(sectionId)
        }
        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
           success: true,
           message: "Course deleted successfully",
        })

    }catch(error){
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })

    }
}


/* ------------------------------ Delete Course ----------------------------- */