const Course = require("../models/Course");
const Section = require("../models/Section");

/* ----------------------------- Create Section ----------------------------- */

exports.createSection = async(req, res) => {
    try{
        //fetch data
    const {courseId, sectionName} = req.body;

    //data Validation
    if(!courseId || !sectionName){
        return res.status(401).json({
            success: false,
            message: 'All field required'
        })
    }

    //create section

    const newSection = await Section.create({sectionName});
    console.log(newSection);

    //update course with section Object

    const updatedCourseDetails = await Course.findByIdAndUpdate({_id: courseId}, 
        {
            $push: {
            courseContent: newSection._id
            }
        }, {new: true})
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();   

    // return  response
    
    return res.status(200).json({
        success: true,
        message: "Section created successfully",
        data:updatedCourseDetails,
    })

    }catch(error){

        return res.status(500).json({
            success: true,
            message: "Please Try Again",
            error:message.error,
        })

    }
}

/* ----------------------------- Create Section ----------------------------- */

/* ----------------------------- Update Section ----------------------------- */

exports.updateSection = async(req, res) => {
    try{
        //fetch data
        const {sectionName, sectionId, courseId} = req.body;

        //data validation
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success: false,
                message: 'Missing Properties'
            })
        }

        //update section Data
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            { sectionName:sectionName},
            {new: true});
        console.log(updatedSection);

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        //response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: course
        })



    }catch(error){
        return res.status(500).json({
            success: true,
            message: "Please Try Again",
        })


    }
}
/* ----------------------------- Update Section ----------------------------- */

/* ----------------------------- Delete Section ----------------------------- */

exports.deleteSection = async(req, res) => {
    try{
        //data fetch - sending id in params
        const {sectionId, courseId} = req.body;

        //validation
        if(!sectionId){
            return res.status(401).json({
                success: false,
                message: 'Missing Properties'
            })
        }

        //use findByIdandDelete
        await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        //response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
            data: course
        })

    }catch(error){
        return res.status(500).json({
            success: true,
            message: "Please Try Again",
            error:message.error,
        })
    }
}
/* ----------------------------- Delete Section ----------------------------- */
