import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';

export default function EnrolledCourses() {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate()

    const [enrolledCourses, setEnrolledCoures] = useState(null);

    const getEnrolledCourses = async() => {
        try{
            console.log("ya error hoga")
            const response = await getUserEnrolledCourses(token);
            setEnrolledCoures(response);
        }catch(error){
            console.log("Unable to fetch Enrolled Courses");
        }
        
    }

    useEffect(() =>{
        getEnrolledCourses(token);
    }, [])


  return (
    <div>
        <div className='text-richblack-5 text-3xl font-medium '>Enrolled Courses</div>
        {
            !enrolledCourses ? (
                <div>Loading...</div>
            ): !enrolledCourses.length ? (<p>You have not enrolled in any Course yet</p>) :
            (
                <div>
                    <div className='text-richblack-600 '>Home / Dashboard / <span className='text-yellow-100'>Enrolled Courses</span></div>
                    <div className='text-richblack-5 grid grid-cols-9 border-[1px] 
                    bg-richblack-700 border-richblack-700 rounded-t-lg'>
                        <p className='col-span-4 px-5 py-4 text-sm'>Course Name</p>
                        <p className='col-span-2 px-5 py-4 text-sm'>Durations</p>
                        <p className='col-span-2 px-5 py-4 text-sm'>Progress</p>
                    </div>
                    {/* card  */}
                    {
                        enrolledCourses.map((course, index) => (
                            <div className='grid grid-cols-9 text-richblack-5 border-[1px]
                             border-richblack-700 rounded-b-lg'>
                                <div className=' flex gap-6 col-span-4 px-5 py-4' 
                                onClick={() => {
                                    navigate(
                                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                    )
                                  }}>
                                    <img src={course.thumbnail} width={80} height={80} className='rounded-lg'/>
                                    <div>
                                        <p >{course.courseName}</p>
                                        <p className='text-richblack-600 text-sm'>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div className='col-span-2 px-5 py-4 flex items-center text-richblack-100 text-sm'>
                                    {course?.totalDuration}
                                </div>

                                <div className='col-span-2 px-5 py-4 text-richblack-100 text-sm'>
                                    <p className='pb-1'>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>
                                <div className='px-5 py-2'>fefe</div>

                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}
