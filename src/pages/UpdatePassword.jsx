import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BsArrowLeft} from "react-icons/bs"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import {resetPassword} from "../services/operations/authAPI"


export const UpdatePassword = () => {

  const navigate = useNavigate()
  const[showPassword, setShowPassword] = useState(false);
  const[showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password:"",
    confirmPassword:""
  });
  const {loading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const {password, confirmPassword} = formData

  const onChangeHandler = (e) => {
    setFormData((prevData) => ({
        ...prevData,
        [e.target.name]:e.target.value

    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
        toast.error("Password does not match")
    }
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));

  }
  return (
    <div className='grid place-content-center w-full h-screen '>
        {
          loading ? (<div>loading....</div>
          ) : (
            <div className='flex flex-col gap-4 w-[400px] mx-auto -mt-[40%]'>
              <h1 className='text-3xl  text-richblack-5'>Choose new password</h1>
              <p className='text-md  text-richblack-200'>Almost done. Enter your password and you're all set.</p>
              <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
                 <label className='relative'>
                    <p className='text-md  text-richblack-200'>New password*</p>
                    <input
                    type={showPassword ? "text" : "password"}
                    name='password'
                    value={password}
                    onChange={onChangeHandler}
                    placeholder='Enter Your Password'
                    className='mt-1 px-2 py-2 w-full rounded-md bg-richblack-700 text-richblack-25'
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute right-2 top-9 z-[10] cursor-pointer'
                    >{showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ):(
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}</span>
                  </label>

                  <label className='relative'>
                    <p className='text-md  text-richblack-200'>Confirm new password*</p>
                    <input
                    type={showConfirmPassword ? "text" : "password"}
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={onChangeHandler}
                    placeholder='Enter Your Confirm Password'
                    className='mt-1 px-2 py-2 w-full rounded-md bg-richblack-700 text-richblack-25'
                    />
                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className='absolute right-2 top-9 z-[10] cursor-pointer'
                    >{showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ):(
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}</span>
                  </label>
                
                <button className='mt-1 px-2 py-2 w-full rounded-md bg-yellow-50 text-richblack-900 font-semibold'>
                Reset Password
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