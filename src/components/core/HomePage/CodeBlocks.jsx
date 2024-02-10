import React from 'react'
import CTAButton from "./Button";
import {FaArrowRight} from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';
import "./CourseCard.css"


function CodeBlocks({position, gradient, heading, subheading, ctabtn1, ctabtn2, codeblock, codeColor}) {
     console.log(gradient);
  return (
    <div className={`flex flex-row ${position} my-20 xl:gap-32 gap-8 xl:mx-[5%] justify-between sm:items-center relative z-0 `}>

      {/* section 1 */}
      <div className='xl:w-[100%] sm:w-[90%] flex flex-col gap-8'>
        {heading}
        <div class="text-richblack-300 font-bold">
          {subheading}
        </div>
        <div className='flex gap-7 mt-7 mx-auto'>
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center'>
              {ctabtn1.btnText}
              <FaArrowRight/>
            </div>

          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
              {ctabtn2.btnText}
          </CTAButton>
        </div>

      </div>

      {/* section 2 */}
      <div className='sm:w-[90%]  flex h-fit py-4 bg-white bg-opacity-5 relative z-10 border-2 border-richblack-700'>
      <div className={`rounded-full w-[60%] h-[90%] absolute -top-[8%] -left-[2%] ${gradient} z-100  opacity-20   blur-md`}></div>
        <div className='flex flex-col w-[10%] text-richblack-400 font-inter font-bold sm:text-[14px] text-[11px] mt-[2px] px-3'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div className={`flex flex-col w-[90%] font-mono gap-2 font-bold sm:text-[14px] text-[11px] ${codeColor} pr-2`}>
          <TypeAnimation
          style={{ whiteSpace: 'pre-line',  display: 'block' }}
           sequence={[codeblock, 2000, ""]}
           omitDeletionAnimation={true}
           repeat={Infinity}
           
          />
        </div>
        
      </div>


    </div>
  )
}

export default CodeBlocks