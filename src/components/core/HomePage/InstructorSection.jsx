import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from './HighLightText'
import CTAButton from "./Button"
import {FaArrowRight} from 'react-icons/fa';
function InstructorSection() {
  return (
    <div className='mt-32'>
        <div className='flex md:flex-row flex-col gap-20 items-center'>
            <div  className='md:w-[50%] flex justify-center items-center'>
                <img src={Instructor}
                alt=""
                className='shadow-white '
                style={{boxShadow: "-20px -20px white"}}
                />
            </div>
            <div className='md:w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semobold md:w-[50%] '>
                    Become an <HighLightText text={"Instructor"}/>
                </div>

                <p className='font-medium text-[16px] md:w-[80%] text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. 
                    We provide the tools and skills to teach what you love.
                </p>

                <div className='flex mx-auto md:mx-0'>
                    <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex items-center gap-1'>
                        Start Teaching Today
                        <FaArrowRight />
                    </div>
                    </CTAButton>
                </div>

            </div>

        </div>
    </div>
  )
}

export default InstructorSection