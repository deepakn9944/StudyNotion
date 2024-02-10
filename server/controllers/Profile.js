const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require("../models/CourseProgress");
const { uploadFileToCloudinary } = require("../utils/filesUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

/* ----------------------------- Update Profile ----------------------------- */

exports.updateProfile = async(req, res) => {
    try{
        //data fetch
        const{gender, dateOfBirth="", about="", contactNumber} = req.body;
        const userId = req.user.id;

        //validation
        if(!gender  || !contactNumber){
            return res.status(400).json({
                success: false,
                message:'Please provide all details'
            })
        }

        //find and Update profile
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);

        profileDetails.gender = gender;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails,
        })
    
        }catch(error){
    
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Please Try Again",
            })
    
        }
}

/* ----------------------------- Update Profile ----------------------------- */

/* ----------------------------- Delete Profile ----------------------------- */

exports.deleteAccount = async(req, res) => {
    try{
        //get id
        const id = req.user.id;
        console.log(id);
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:'User not found',
            })
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //delete User from all enrolled courses
        const courses = userDetails.courses;
        // courses.forEach(async(courseId) => {
        //    await Course.findByIdAndUpdate({courseId},{$pull:{studentEnrolled: id}});
        // })

        //delete User 
        await User.findByIdAndDelete(id);

        //response
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Please Try Again",
        })


    }
}
/* ----------------------------- Delete Profile ----------------------------- */

/* ------------------------------- getAllUserDetails ------------------------------- */

exports.getAllUserDetails = async (req, res) => {
    try{
        //get id
        const id = req.user.id;

        //validation
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response

        return res.status(200).json({
            success: true,
            message: "User details fetched Successfully",
            userDetails,
        })
        



    }catch(error){

        return res.status(500).json({
            success: true,
            message: "Please Try Again",
            error:message.error,
        })


    }
}
/* ------------------------------- getAllUserDetails ------------------------------- */

/* ---------------------------- Update Profile Image --------------------------------- */

exports.updateDisplayPicture = async(req, res) => {
    try{
        //data fetching
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;

        //upload to cloudinary
        const image = await uploadFileToCloudinary(
                displayPicture,
                process.env.FOLDER_NAME,
                1000,
                1000
        );
        console.log(image);

        const updatedProfile = await User.findByIdAndUpdate(userId, {image: image.secure_url},{new: true});

        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
          })
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          })
        }
}

/* ---------------------------- Update Profile Image --------------------------------- */


/* ---------------------------- Get All Enrolled Courses ----------------------------- */

exports.getEnrolledCourses = async(req, res) => {
    try{
        //data fetching
        const userId = req.user.id;
        let userDetails = await User.findOne({_id: userId})
        .populate({
            path: "courses",
            populate: {
              path: "courseContent",
              populate: {
                path: "subSection",
              },
            },
          })
          .exec()
        
	  userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
        (acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }

/* ---------------------------- Get All Enrolled Courses ----------------------------- */


/* --------------------------- Instuctor Dashboard -------------------------- */

exports.instructorDashboard = async(req, res) => {
  try{
    const courseDetails = await Course.find({instructor: req.user.id});

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentEnrolled.length;
      const totalAmountGenerated = course.price * totalStudentsEnrolled;

      //new object
      const courseDataWithStats = {
        _id : course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated
      }

      return courseDataWithStats;
    })

    res.status(200).json({
      courses: courseData
    });

  }catch(error){
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}


/* --------------------------- Instuctor Dashboard -------------------------- */