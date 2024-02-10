import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import RenderSteps from '../AddCourse/RenderSteps';

export default function EditCourse() {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    console.log(course);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
            }
            setLoading(false)
        }
        populateCourseDetails();
    },[])

    if(loading){
        return(
            <div>
                Loading....
            </div>
        )
    }


  return (
    <div className='flex flex-col mx-auto w-[48%]'>
        <h1 className='text-richblack-5 font-semibold text-3xl text-center'>Edit Course</h1>
        <div className='max-w-[1000px]'>
            {
                course ? (<RenderSteps />) : (<p className="mt-14 text-center text-3xl font-semibold text-richblack-100">Course Not Found</p>)
            }
        </div>
    </div>
  )
}
