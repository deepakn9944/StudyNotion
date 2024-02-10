import React from 'react'
import HighLightText from './HighLightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import CTAButton from "./Button"

function LearningLanguageSection() {
  return (
    <div className='my-[130px] '>
      <div className='flex flex-col gap-5'>
        <div className='sm:text-center text-3xl'>
          Your swiss Knife for
          <HighLightText text={"learning any language"} />
        </div>

        <div className='sm:text-center text-richblack-600 mx-auto text-base font-medium sm:w-[70%]'>
          Using spin making learning multiple language easy with 20+ languages realistic voice-over,
          progress tracking custom schedule and more
        </div>

        <div className='flex lg:flex-row flex-col items-center justify-center mt-5'>
          <img
          src={know_your_progress}
          alt="know_your_progressImage"
          className='object-contain lg:-mr-32'
          />
          <img
          src={compare_with_others}
          alt="compare_with_othersImage"
          className='object-contain'
          />
          <img
          src={plan_your_lesson}
          alt="plan_your_lessonImage"
          className='object-contain lg:-ml-36'
          />

        </div>

        <div className='flex justify-center'>
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection