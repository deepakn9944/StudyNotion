const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadFileToCloudinary } = require("../utils/filesUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

/* ---------------------------- Create Subsection --------------------------- */

exports.createSubsection = async(req, res)=>{
    try{
        //data fetch
        const {title, description, sectionId} = req.body;
        const video = req.files.video;
        
        console.log(req.body);
        console.log(video);
        //validation
        if(!title || !description || !video){
            return res.status(400).json({
                success:false,
                message:'Please provide all details'
            })
        }

        //upload video to cloudinary 
        const videoDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        const totalDurationInSeconds = parseInt(videoDetails.duration);
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        
        //create subSection
        const newSubsection = await SubSection.create({
            title,
            timeDuration:`${totalDuration}`,
            description,
            videoUrl: videoDetails.secure_url,
        })
        console.log(newSubsection);

        //update Section
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},{$push:{subSection: newSubsection._id}},{new: true})
            .populate('subSection');

        //populate subsectiondetails
        //updatedSection.exec();
        
        //return response
        return res.status(200).json({
            success: true,
            message:'Subsection created successfully',
            data:updatedSection
        })

        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Please Try Again',
        })

    }
}
/* ---------------------------- Create Subsection --------------------------- */

/* ----------------------------- Update Subsection ----------------------------- */

exports.updateSubsection = async(req, res) => {
    try{
        //fetch data
        const {title, description, subSectionId, sectionId} = req.body;
        const video = req.files.video;
        
        console.log(req.body);
        //data validation
        if(!title || !description){
            return res.status(400).json({
                success:false,
                message:'Please provide all details'
            })
        }

        //upload video
        const videoDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        const totalDurationInSeconds = parseInt(videoDetails.duration);
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        //update section Data
        const updatedSubsection = await SubSection.findByIdAndUpdate({_id:subSectionId},
            {title:title,
            timeDuration:`${totalDuration}`,
            description: description,
            videoUrl: videoDetails.secure_url,
            },
            {new: true});
        //console.log(updatedSubsection);

        const updatedSection = await Section.findById(sectionId).populate("subSection")
        //console.log(updatedSection);

        //response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data:updatedSection,
        })



    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Please Try Again",
        })


    }
}


/* ----------------------------- Update Subsection ----------------------------- */

/* ----------------------------- Delete Subsection ----------------------------- */


exports.deleteSubsection = async(req, res) => {
    try{
        //data fetch - sending id in params
        const {subSectionId, sectionId} = req.body;

        //validation
        if(!subSectionId){
            return res.status(401).json({
                success: false,
                message: 'Missing Properties'
            })
        }

        //use findByIdandDelete
        await SubSection.findByIdAndDelete(subSectionId);

        const updatedSection = await Section.findById(sectionId).populate("subSection")

        //response
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            data:updatedSection,
        })

    }catch(error){
        return res.status(500).json({
            success: true,
            message: "Please Try Again",
        })
    }
}
/* ----------------------------- Delete Subsection ----------------------------- */