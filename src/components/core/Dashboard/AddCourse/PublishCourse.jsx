import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';
import { editCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

function PublishCourse() {

  const {
    register,
    setValue, 
    getValues,
    handleSubmit
  } = useForm();

  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public", true);
    }
  }, [])

  const goBack = () =>{
    dispatch(setStep(2));
  }

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async() => {
    if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
    course.status === COURSE_STATUS.DRAFT && getValues("public") === false){
      //form not updated
      goToCourses();
      return;
    }

    //if updated 
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if(result){
      goToCourses();
    }
    setLoading(false);
  }

  const onSubmit = () =>{
    handleCoursePublish();

  }
  return (
    <div  className='rounded-md  border-[1px] border-richblack-700
    bg-richblack-800 p-6 space-y-6 text-richblack-5'>
      <p className='text-xl font-semibold'>Publish Course</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row-reverse justify-end items-center gap-2 mb-4'>
          <label htmlFor='public'>Make this Course as Public</label>
          <input 
          type="checkbox"
          id="public" 
          {...register("public",{required: true})}
          className='rounded h-4 w-4'
          />
        </div>
        <div className='flex justify-end gap-3'>
          <button 
          disabled={loading}
          type="button"
          onClick={goBack}
          className="bg-richblack-700 px-5 py-2 text-md font-semibold rounded-md"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" 
          customClasses={"bg-yellow-50 px-5 py-2 text-md font-semibold text-black rounded-md"}/>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse