import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BsArrowLeft} from "react-icons/bs"
import { Link } from 'react-router-dom';
import {getPasswordResetToken} from "../services/operations/authAPI"


export const ForgotPassword = () => {

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));

  }
  return (
    <div className='grid place-content-center w-full h-screen '>
        {
          loading ? (<div>loading....</div>
          ) : (
            <div className='flex flex-col gap-4 w-[400px] mx-auto -mt-[40%]'>
              <h1 className='text-3xl  text-richblack-5'>{emailSent ? ("Check Email"):("Reset your password")}</h1>
              <p className='text-md  text-richblack-200'>{!emailSent ? (
                `Have no fear. We’ll email you instructions to reset your password.
                 If you dont have access to your email we can try account recovery`
                 ):(
                  `We have sent the reset email to
                  ${email}`
              )}</p>
              <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
                {
                  !emailSent && (<label>
                    <p className='text-md  text-richblack-200'>Email Address*</p>
                    <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Your Email'
                    className='mt-1 px-2 py-2 w-full rounded-md bg-richblack-700 text-richblack-25'
                    />
                  </label>)
                }
                <button className='mt-1 px-2 py-2 w-full rounded-md bg-yellow-50 text-richblack-900 font-semibold'>
                {emailSent ? ("Resend email"):("Reset Password")}
                </button>
              </form>
             
              <div >
                <Link to={"/login"} className='flex items-center text-richblack-5 gap-1'>
                <BsArrowLeft />
                <p className=''>Back to login</p>
                </Link>
              </div>
            </div>

          )
        }
    </div>
  )
}
