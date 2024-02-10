import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import {BsArrowLeft} from "react-icons/bs"
import { signUp } from '../services/operations/authAPI';

function VerifyEmail() {

    const [otp, setOtp] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {signupData, loading} = useSelector((state) => state.auth);


    useEffect(() => {
        if(!signupData){
            navigate("/signup");
        }
    }, [])

    

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        console.log(signupData);

       

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }


  return (
    <div className='grid place-content-center w-full h-screen '>
        {
            loading ? (<div>loading</div>
            ) : (
                <div className='flex flex-col gap-4 w-[400px] mx-auto -mt-[40%]'>
                    <h1 className='text-3xl  text-richblack-5'>Verify Email</h1>
                    <p className='text-md  text-richblack-200'>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span className='px-3 text-richblack-25'>-</span>}
                        renderInput={(props) => <input {...props} className='text-richblack-25 h-12 py-6 text-[40px] rounded-md bg-richblack-700'/>}
                        />
                        <button type="submit" className='mt-1 px-2 py-2 w-full rounded-md bg-yellow-50 text-richblack-900 font-semibold'>
                            Verify Email
                        </button>
                    </form>

                    <div className='flex'>
                        <div>
                            <Link to={"/login"} className='flex items-center text-richblack-5 gap-1'>
                            <BsArrowLeft />
                            <p className=''>Back to login</p>
                            </Link>
                        </div>

                        <button onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                        className='flex justify-end ml-auto text-sm text-blue-100 '>
                            Resend OTP
                        </button>
                    </div>
                </div>

            )
        }
    </div>
  )
}

export default VerifyEmail