const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const mongoose = require("mongoose");


/* ------------------------------ Create Rating ----------------------------- */

exports.createRating = async(req, res) => {
    try{
        //data fetch
        const userId = req.user.id;
        console.log(userId);
        const{rating, review, courseId} = req.body;

        //check user enrolled to course
        const courseDetails = await Course.findOne({_id:courseId, studentEnrolled: {$elemMatch: {$eq: userId}}, });

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled'
            })
        }

        //check if user already reviewed the course

        const alreadyReviewed = await RatingAndReview.findOne({user:userId, course:courseId})
        if(alreadyReviewed ){
            return res.status(401).json({
                success:false,
                message:'Student already reviewed the course'
            })
        }
        //data validation
        if(!rating || !review){
            return res.status(400).json({
                success:false,
                message:"Please provide all details"
            })
        }

        //create rating
        const ratingDetails = await RatingAndReview.create({
            user: userId,
            rating: rating,
            review: review,
            course: courseId,
        });

        //update rating in course
        const updatedCourse = await Course.findByIdAndUpdate({_id: courseId}, {$push:{ratingAndReviews: ratingDetails._id}}, {new: true});
        console.log(updatedCourse);

        //response
        return res.status(200).json({
            success:true,
            message:'Rating and Review created successfully'
        })


    }catch(error){

        return res.status(500).json({
            success:false,
            message:'Please try again'
        })

    }
}
/* ------------------------------ Create Rating ----------------------------- */

/* ----------------------------- Get Avg Rating ----------------------------- */

exports.getAverageRating = async(req, res) => {
    try{
        //data fetch
        const {courseId} = req.body;
        //get average
        // const avg = await Course.findById(courseId).populate("ratingAndReviews").exec().aggregate(
        //     [{$group:{"_id" : "_id", AverageValue: {$avg: "$rating"}}}]
        //     );
        const result = await RatingAndReview.aggregate([
            {
                $match:{course: new mongoose.Types.ObjectId(courseId),}
            },
            {
                $group:{
                    _id:null,
                    averageRating: {$avg: "$rating"},
                }
            }
        ])

        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })

        }
        else{
            return res.status(200).json({
                success:true,
                averageRating:0,
                message:'No rating is available'
            })
        }
            

    }catch(error){
        console.log(error);
            return res.status(500).json({
                success:false,
                message:'Please try again'
            })

    }
    
}

/* ----------------------------- Get Avg Rating ----------------------------- */


/* ------------------------------ getAllRating ------------------------------ */

exports.getAllRating = async(req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({path:"user", select:"firstName lastName email image"})
        .populate({path:"course", select:"courseName"})
        .exec();

        return res.status(200).json({
            success:true,
            message:'all reviews',
            data: allReviews,
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Please try again'
        })


    }
}

/* ------------------------------ getAllRating ------------------------------ */


/* ----------------------------- Get All Rating(course) ----------------------------- */

exports.getAllCourseRating = async(req, res) => {
    try{
        //data fetch
        const {courseId} = req.body;

        //get all rating
        const course = await Course.findById(courseId).populate("ratingAndReviews").exec();
        //response
        return res.status(200).json({
            success:true,
            message:'All Ratings',
            ratings:course.ratingAndReviews,
            
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Please try again'
        })

    }
}

/* ----------------------------- Get All Rating(course) ----------------------------- */