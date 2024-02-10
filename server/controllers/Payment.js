const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress")


// /* ---------------------------- capturing payment --------------------------- */

// //capture the payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {
//     try{
//     //get courseId and userId
//     const userId = req.user.id;
//     const {courseId} = req.body;

//     //validation
//     //valid course
//     if(!courseId){
//         return res.json({
//             success: false,
//             message:'Please provide course ID',
//         })
//     };
//     //valid courseDetails
//     let course = await Course.findById(courseId);
//     if(!course){
//         return res.json({
//             success: false,
//             message:'Could not find the course',
//         })
//     }
    
//     //user already pay for the same course
//     const uid = new mongoose.Types.ObjectId(userId);
//     if(course.studentEnrolled.includes(uid)){
//         return res.status(200).json({
//             success: true,
//             message:'Student already enrolled',
//         })
//     }

//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount*100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId:courseId,
//             userId,

//         }
//     };

//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);

//     //return response
//     return res.status(200).json({
//         success: true,
//         courseName:course.courseName,
//         courseDescription: course.courseDescription,
//         thumbnail: course.thumbnail,
//         orderId: paymentResponse.id,
//         currency: paymentResponse.currency,
//         amount: paymentResponse.amount,

//     });

//     }catch(error){
//         return res.status(500).json({
//             success: false,
//             message: 'Could not initiate payment'
//         })

//     }
   
// }

// /* ---------------------------- capturing payment --------------------------- */

// /* ------------------------------ Authorization ----------------------------- */

// exports.verifySignature = async (req, res) => {
//     //our sign
//     const webhookSecret = "12345678";

//     //razopay secret key
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("Payment is Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;
//         try{
//             //fullfill the action
//             //find the course and enroll the student in it
//             const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId}, {$push:{studentEnrolled: userId}}, {new: true});
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message: 'course not found'
//                 })
//             }
//             console.log(enrolledCourse);

//             //find student and update courses
//             const enrolledStudent = await User.findByIdAndUpdate({_id:userId}, {$push:{courses: courseId}}, {new: true});
//             console.log(enrolledStudent);

//             //mail send for confirmation
//             const emailResponse = await mailSender(enrolledStudent.email, "Congratulations, ", courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName));
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message:"Course Added Successfully"
//             })




//         }catch(error){
//             console.error(error);
//             return res.status(500).json({
//                 success: false,
//                 message:error.message,
//             })

//         }
//     }
//     else{
//         return res.status(400).json({
//             success: false,
//             message:'signature does not matched',
//         })
//     }

// }
// /* ------------------------------ Authorization ----------------------------- */

/* ---------------------------- capturing payment --------------------------- */

//capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    try{
    //get courseId and userId
    const userId = req.user.id;
    const {courses} = req.body;
    

    //validation
    //valid courses
    if(courses.length === 0){
        return res.json({
            success: false,
            message:'Please provide course ID',
        })
    };
   
    
    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        course = await Course.findById({_id: course_id});
        if(!course){
            res.status(400).json({
                success: false,
                message: "course not found"
            })
        }
         //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)){
            return res.status(400).json({
                success: false,
                message:'Student already enrolled',
            })
        }

        totalAmount += course.price;

        //order create
        const currency = "INR";

        const options = {
            amount: totalAmount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
        };


        const paymentResponse = await instance.orders.create(options);
        //console.log(paymentResponse);
    
        //return response
        //console.log("hurry")
        return res.status(200).json({
            success: true,
            message:paymentResponse, 
    
        });
    }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Could not initiate payment'
        })

    }
   
}

/* ---------------------------- capturing payment --------------------------- */

/* ------------------------------ Authorization ----------------------------- */

exports.verifyPayment = async(req, res) => {

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id; 
     
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(404).json({
            success: false,
            message: "Payment Failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    //razopay secret key

    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");
        if(razorpay_signature === expectedSignature){
            console.log("Payment is Authorised");
            //enroll studenrs
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({
                success: true,
                message:"Payment Verified"
            });
            
        }
        else return res.status(500).json({
                success:"false",
                message:"Payment Failed"
            })
}

/* ------------------------------ Authorization ----------------------------- */

/* ---------------------------- Enrolled Student ---------------------------- */

const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            console.log("here is your course id", userId);
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findByIdAndUpdate(
            {_id:courseId},
            {$push:{studentEnrolled:userId}},
            {new:true},
        )
        console.log("here is your course id", userId);

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            courseID:courseId,
            userId:userId,
            completedVideos: [],
        })

        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress: courseProgress._id,
            }},{new:true})
            console.log(enrolledStudent);
        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log("hey",error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}

/* ---------------------------- Enrolled Student ---------------------------- */

/* ------------------------------- SuccessMail ------------------------------ */

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;
   // console.log("1 ",orderId)

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success: false,
            message:"Please provide all the fields"
        });
    }

    try{
        //search student
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
            amount/100, orderId, paymentId)
        )

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message:"Could not send mail",
        })

    }
}
/* ------------------------------- SuccessMail ------------------------------ */