import React from 'react'
import HighLightText from '../HomePage/HighLightText'



function Quote() {
  return (
    <div className='w-full bg-richblack-900 mt-[10%] text-center mx-auto border-b-[1px] border-richblack-200'>
    <p className='w-[80%]  lg:text-4xl md:text-2xl lg text-richblack-25 font-semibold mx-auto pb-[100px] '>
    <q >
    We are passionate about revolutionizing the way we learn. Our 
    innovative platform <HighLightText text={"combines technology"} />, 
    <span className='bg-gradient-to-t font-bold from-[#FF512F] to-[#F09819] text-transparent bg-clip-text'>expertise</span>, and community to
    create an <span className='bg-gradient-to-r font-bold from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>unparalleled educational experience</span>.
    </q>
    </p>
   </div>
  )
}

export default Quote