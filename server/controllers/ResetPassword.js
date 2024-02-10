const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

/* -------------------------- resetPasswordToken -------------------------- */

exports.resetPasswordToken = async (req, res) => {
    try{

    //get email from req body
    const email = req.body.email;
    //check user for this email, validation
    const user = await User.findOne({email: email});
    if(!User){
        return res.status(401).json({
            success: false,
            message:'Your Email is not registered',
        });
    }
    //generate token
    const token =  crypto.randomBytes(20).toString("hex");

    //update user by adding token and expiry time
    const updatedDetails = await User.findOneAndUpdate({email: email}, {token:token, resetPasswordExpires: Date.now() + 5*60*1000}, {new:true});
    console.log("DETAILS", updatedDetails);

    //create url
    const url = `http://localhost:3000/update-password/${token}`;

    //send mail containing url
    await mailSender(email, "Password Reset",
    `Your Link for email verification is ${url}. Please click this url to reset your password.`);
    
    //return response
    return res.status(200).json({
        success: true,
        message:'Mail send successfully, please check email and change password'
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
                message:'Something went wrong, please try again',
        });
    }
    
}

/* -------------------------- resetPasswordToken -------------------------- */



/* ---------------------------- reset password ---------------------------- */

exports.resetPassword = async(req, res) => {
    try{
        //data fetch
        const{token, password, confirmPassword} = req.body;
        //validation
        if(!token || !password || !confirmPassword){
            return res.status(401).json({
                success: false,
                message:'Please fill all details'
            })
        }
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message:'Password and confirm password does not matched'
            })
        }
        //get user details from db using token
        const user = await User.findOne({token: token});

        //if no entry - invalid token
        if(!user){
            return res.status(401).json({
                success: false,
                message:'Invalid Token'
            })
        }
        //token time check
        if(user.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success: false,
                message:'Token is expired, Please regenerate your token'
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate({token: token},
            {password: hashedPassword},
            {new:true});
        
        //send response
        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        })    

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, Please try again later'
        })

    }

}

/* ---------------------------- reset password ---------------------------- */