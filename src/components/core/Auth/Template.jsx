import React from 'react'
import frameImg from "../../../assets/Images/frame.png"
import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({title, description1, description2, image, formType}) {
  
  const {loading} = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {loading ? (
            <div>loading</div>
        ) : (
            <div className='flex justify-between w-10/12 max-w-content'>
                <div className="w-[35%] flex flex-col gap-4">
                    <h1 className='text-3xl font-semibold font-inter text-richblack-25'>{title}</h1>
                    <div>
                    <p className='text-richblack-100 text-lg'>{description1}</p>
                    <p className='text-blue-100 font-edu-sa  text-md font-bold italic'>{description2}</p>
                    </div>
                    {formType === "signup" ? <SignupForm /> : <LoginForm />}
                </div>

                <div className='relative  max-w-[450px]'>
                    <img src={frameImg} alt="Pattern" width={558} height={504} loading='lazy' />
                    <img src={image} alt="Students" width={558} height={504} loading='lazy' 
                    className='absolute -top-4 -left-4' />
                </div>
            </div>
        )}
    </div>
  )
}

export default Template