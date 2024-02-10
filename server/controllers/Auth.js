const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const isEmailValid = require("../utils/emailValidator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile")
require("dotenv").config();


/* --------------------------------- SignUp --------------------------------- */

exports.signUp = async (req, res) => {
    try{
         //data fetch from req
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    } = req.body;
    //data validate
    if(  !firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp){
        return res.status(403).json({
            success: false,
            message: 'All fields are required',
        })
    }


    //2 password match
    if(password !== confirmPassword){
        return res.status(400).json({
            succcess: false,
            message: 'Password and ConfirmPassword does not match, please try again'
        });
    }
    //check user already exist or not
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success: false,
            message: 'User is already registered'
        });
    }

    //find most recent otp for the user
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    //validate otp
    if(recentOtp.length == 0){
        // OTP not found for the email
        return res.status(400).json({
            success:false,
            message:'OTP not found'
        })
    }
    if(recentOtp[0].otp != otp){
        // Invalid OTP
        return res.status(400).json({
            success:false,
            message:'Invalid OTP',
        })
    }
    //password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
	let approved = "";
	approved === "Instructor" ? (approved = false) : (approved = true);

    //create entry in DB

    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
    });

    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        approved: approved,
        additionalDetails:profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })
    //return res
    return res.status(200).json({
        success: true,
        message:'User Successfully Registered',
        user,
    })

    }catch(error){
        console.log(error);
    return res.status(500).json({
        success: false,
        message: error.message
    })

    }
   
}

/* --------------------------------- SignUp --------------------------------- */


/* ---------------------------------- login --------------------------------- */

exports.login = async(req, res) => {
    try{
         //get data from req body
     const {email, password} = req.body;

     //validation

     if(!email || !password){
        return res.status(403).json({
            success: false,
            message: 'All fields are required'
        })
     }

    //  user exist or not
     const user = await User.findOne({email}).populate("additionalDetails");
     if(!user){
        return res.status(401).json({
            success: false,
            message: 'User is not registered, please signup first'
        })
     }

     //generate JWT after password matching
     if(await bcrypt.compare(password, user.password)){
        const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"24h",
        });
        user.token = token;
        user.password = undefined;

        //create cookie and send response
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message:'Logged in successfully',
        })
     }
     else{
        return res.status(401).json({
            success: false,
            message: 'Password is incorrect'
        })
     }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, Please try again',
        })

    }
    
 
}

/* ---------------------------------- login --------------------------------- */


/* -------------------------------- Send OTP -------------------------------- */

exports.sendOTP = async(req, res) => {

    try{
      //fetch mail from request
      const {email} = req.body;
 
      //check for mail in DB
      const checkUserPresent = await User.findOne({email});
  
      //if present return res
      if(checkUserPresent){
          return res.status(401).json({
              success: false,
              message: 'User already registered',
          })
      }
 
      //generate OTP
      var otp = otpGenerator.generate(6, {
         upperCaseAlphabets: false,
         lowerCaseAlphabets: false,
         specialChars: false,
      });
      console.log("OTP generated: ", otp);
 
      //check for unique otp
      let result = await OTP.findOne({otp: otp});
 
      while(result){
         otp = otpGenerator.generate(6, {
             upperCaseAlphabets: false,
             lowerCaseAlphabets: false,
             specialChars: false,
          });
          result = await OTP.findOne({otp: otp});
      }
 
      const otpPayload = {email, otp};
 
      //create an entry for OTP
      const otpBody = await OTP.create(otpPayload);
      console.log(otpBody);
 
      //return response successful
      res.status(200).json({
         success:true,
         message:'OTP Sent Successfully',
         otp,
      })
    }catch(error){
     console.log(error);
     return res.status(500).json({
         success: false,
         message: error.message
     })
 
    }
 }
 
 /* -------------------------------- Send OTP -------------------------------- */


/* ----------------------------- ChangePassword ----------------------------- */

exports.changePassword = async(req, res) =>{
    try{
        //data fetch
        const userDetails = await User.findById(req.user.id);
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        //validation
        if(!email || !oldPassword || !newPassword || !confirmNewPassword){
            return res.status(403).json({
                success: false,
                message: 'All fields are required'
            })
        }

        // Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

        //password match
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: 'Password does not match'
            })
        }

        //password update
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await User.findByIdAndUpdate(req.user.id, {password: hashedPassword},{new: true});
            console.log(updatedUser);

            //mail send
            // Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}
        // Return success response
		return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
        
    }catch(error){
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: 'Password change Failure, Please try again',
            error: error.message,
        })

    }
}

/* ----------------------------- ChangePassword ----------------------------- */