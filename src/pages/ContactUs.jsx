import React from 'react'
import ContactUsForm from '../components/common/ContactUsForm'
import {HiChatBubbleLeftRight}   from 'react-icons/hi2';
import {IoEarthSharp } from 'react-icons/io5'
import {IoCall } from 'react-icons/io5'
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';


function ContactUs() {
  return (
    <>
    <div className='w-10/12 mx-auto' >
        <div className=' mt-[5%] flex felx-col justify-between '>
            <div className='w-[40%]'>
                <div className='flex flex-col gap-10 bg-richblack-800 p-[3%] rounded-lg w-full'>
                <div className='text-richblack-300'>
                    <div className='flex gap-3 text-xl font-semibold text-white'>
                        <HiChatBubbleLeftRight className=' text-2xl' />
                        Chat on us
                    </div>
                    <p className='text-richblack-300'>Our friendly team is here to help.</p>
                    <p className='text-richblack-300'>info@studynotion.com</p>

                </div>
                <div className='text-richblack-300'>
                    <div  className='flex gap-3 text-xl font-semibold text-white' >
                        <IoEarthSharp className=' text-2xl' />
                        Visit us
                    </div>
                    <p className='text-richblack-300'>Come and say hello at our office HQ.</p>
                    <p className='text-richblack-300'>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,</p>
                    <p className='text-richblack-300'>Bangalore-560016</p>
                </div>
                <div className='text-richblack-300'>
                    <div  className='flex gap-3 text-xl font-semibold text-white'>
                        <IoCall className=' text-2xl' />
                        Call us
                    </div>
                    <p className='text-richblack-300'>Mon - Fri From 8am to 5pm</p>
                    <p className='text-richblack-300'>+123 456 7869</p>
                </div>
                </div>
            </div>
            <div className='w-[55%] border-richblack-500 border-[1px] rounded-lg py-8 '>
                <div className='px-16 space-y-2 mb-8'>
                    <div className='text-richblack-25 text-4xl font-bold'> Got a Idea? We've got the skills. Let's team up</div>
                    <div className='text-richblack-300 text-lg '>Tell us more about yourself and what you're got in mind.</div>
                </div>
                <ContactUsForm />
            </div>
            
        </div>


        
    </div>
        <div className='w-11/12 mx-auto'>
            <h2 className="text-center text-4xl font-semibold mb-2 text-white mt-[100px]">Review from other learners</h2>
            <ReviewSlider />
       </div>
   

    <Footer />
    </>
  )
}

export default ContactUs