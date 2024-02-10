const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req, res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try{
        const subSection = await SubSection.findById({_id: subSectionId});

        if(!subSection){
            return res.status(404).json({error:"Invalid SubSection"});
        }

        console.log("SubSection Validation Done");

        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            });
        }
        else {
            console.log("Course Progress Validation Done");

            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(404).json({
                    error:"Subsection already completed",
                })
            }

            //poush into completed video
            courseProgress.completedVideos.push(subSectionId);
            console.log("course Progress push done")
        }
        await courseProgress.save();
        console.log("Course Progress Save call Done");
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })

    }
    catch(error) {
        console.error(error);
        return res.status(400).json({error:"Internal Server Error"});
    }
}