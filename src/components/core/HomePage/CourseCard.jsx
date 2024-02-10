import React from 'react'
import "./CourseCard.css"

function CourseCard({cardData, currentCard, setCurrentCard}) {
  return (
    <div className={`${currentCard === cardData.heading ? "bg-white text-richblack-900 card" : "bg-richblack-700 text-richblack-200"} px-5  pt-5 flex flex-col justify-between `} onClick={() => setCurrentCard(cardData.heading)}>
      <div className=''>
        <div className={`${currentCard === cardData.heading ? " text-richblack-900" : "text-white"} font-semibold text-lg`}>{cardData.heading}</div>
        <div className='text-sm'>{cardData.description}</div>
      </div>
        
        
        <div className={`${currentCard === cardData.heading ? "text-blue-100" : "bg-richblack-700 text-richblack-200"} mt-[40%] flex justify-between
        border-t-[1.75px] border-richblack-200 border-dashed pb-2`}>
            <div>
            {cardData.level}
            </div>
            <div>
              {cardData.lessionNumber}
            </div>
        </div>

    </div>
  )
}

export default CourseCard