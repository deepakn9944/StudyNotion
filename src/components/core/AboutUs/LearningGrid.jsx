import React from 'react'
import HighLightText from '../HomePage/HighLightText'
import Button from '../HomePage/Button'


function LearningGrid() {
  return (
    <div className='md:w-11/12 sm:w-11/12 4/12 mx-auto'>
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 w-11/12 mx-auto mt-[100px] '>
            <div className='sm:col-span-2 pb-10 w-[90%] flex flex-col gap-10 items-start'>
                <div>
                    <h1 className='text-4xl font-semibold text-richblack-5 mb-2 w'>
                    World-Class Learning for 
                    <HighLightText text={"Anyone, Anywhere"} />
                    </h1>
                    <p className='text-md text-richblack-400'>Studynotion partners with more than 275+ leading universities 
                        and companies to bring flexible, affordable, job-relevant online
                        learning to individuals and organizations worldwide.
                    </p>
                </div>
                <Button active={true} linkto={"/login"}> Learn More </Button>
            </div>
            <div className='flex flex-col items-start gap-8 py-8 px-8  bg-richblack-700'>
                <h1 className='text-xl text-richblack-5'>Curriculum Based on Industry Needs</h1>
                <p className='text-md text-richblack-400'>Save time and money! The Belajar
                    curriculum is made to be easier to
                    understand and in line with industry needs.
                </p>
            </div>
            <div className='flex flex-col items-start gap-8 py-8 px-8  bg-richblack-800'>
                <h1 className='text-xl text-richblack-5'>Our Learning Methods</h1>
                <p className='text-md text-richblack-400'>The learning process uses 
                the namely online and offline.
                </p>
            </div>
            <div className='lg:flex hidden'></div>
            <div className='flex flex-col items-start  gap-8 py-8 px-8 lg:bg-richblack-700 sm:bg-richblack-800 bg-richblack-700'>
                <h1 className='text-xl text-richblack-5'>Certification</h1>
                <p className='text-md text-richblack-400'>You will get a certificate that can
                 be used as a certification during job hunting.
                </p>
            </div>
            <div className='flex flex-col items-start  gap-8 py-8 px-8  lg:bg-richblack-800 sm:bg-richblack-700 bg-richblack-800'>
                <h1 className='text-xl text-richblack-5'>Rating "Auto-grading"s</h1>
                <p className='text-md text-richblack-400'>You will immediately get feedback
                 during the learning process without having to wait for an answer or response from the 
                mentor.
                </p>
            </div>
            <div className='flex flex-col items-start  gap-8 py-8 px-8 bg-richblack-700'>
                <h1 className='text-xl text-richblack-5'>Ready to Work</h1>
                <p className='text-md text-richblack-400'>Connected with over 150+ hiring partners,
                 you will have the opportunity to find a job after
                 graduating from our program.
                </p>
            </div>
        </div>
       </div>
  )
}

export default LearningGrid
