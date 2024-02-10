import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from "../../common/RatingStars"
import GetAvgRating from '../../../utils/avgRating';

const CourseCard = ({course, Height}) => {

    console.log(course);
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    // useEffect(() => {
    //     const count = GetAvgRating(course.ratingAndReviews);
    //     setAvgReviewCount(count);
    // }, [course])
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
        <div className='bg-richblack-800 rounded-lg'>
            <div >

                <img
                 src={course?.thumbnail}
                 alt="course img"
                 className={`${Height} w-full object-cover rounded-t-lg`}/>
            </div>

            <div className='flex flex-col gap-2 p-4'>
                <p className='text-2xl'>{course?.courseName}</p>
                <p className='text-richblack-200'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                <div className='flex gap-2 items-center'>
                    <span className='text-lg text-yellow-100'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count={avgReviewCount}/>
                    {/* <span className="text-lg text-richblack-200 ">{course?.ratingAndReviews?.length} Rating</span> */}
                </div>
                    <p className="text-xl">₹ {course?.price}</p>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default CourseCard