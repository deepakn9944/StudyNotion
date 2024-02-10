const Category = require('../models/Category');
const Course = require("../models/Course");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }



/* ---------------------- create category handler function --------------------- */

exports.createCategory = async(req, res) => {
    try{
        //data fetch
        const {name, description} = req.body;
        
        //validation
        if(!name){
            return res.status(401).json({
                success: false,
                message:"Please fill all fields"
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);

        //response
        return res.status(200).json({
            success: true,
            message:'Category Created Successfully',
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Please Try Again"
        })
    }
}

/* ---------------------- create category handler function --------------------- */



/* ----------------------- getAllCategories handler function ---------------------- */

exports.showAllCategories = async(req, res) => {
    try{
        const allCategories = await Category.find({}, {name:true, description:true});
        res.status(200).json({
            success:true,
            message:'All Categories are returned successfully',
            data: allCategories
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message:"Please Try Again"
        })
    }
}

/* ----------------------- getAllCategories handler function ---------------------- */


/* --------------------------- categoryPageDetails -------------------------- */

exports.categoryPageDetails = async(req, res) => {
    try{
        //data fetch
        const{categoryId} = req.body;
        

        //data of given category
        const selectedCategoryDetails = await Category.findById({_id: categoryId})
        .populate(
            {
                path: "courses", 
                match: {status: "Published"},
                // populate: "ratingAndReviews",
            }
        ).exec();

       
        //validation
        if(!selectedCategoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category Not Found',
            });
        }
        
        // Handle the case when there are no courses
      if (selectedCategoryDetails.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }

        //get courses for other categories

        const categoriesExceptSelected = await Category.find({_id: {$ne: categoryId},});
        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
            ._id
        ).populate({
            path:"courses",
            match: {status: "Published"},
        }).exec()

        //get top 10 selling courses
        const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)


        //response
        return res.status(200).json({
            success: true,
            categoriesExceptSelected,
            selectedCategoryDetails,
            mostSellingCourses
        })

    }catch(error){

        return res.status(500).json({
            success: false,
            message:"Please Try Again"
        })

    }
}

/* --------------------------- categoryPageDetails -------------------------- */