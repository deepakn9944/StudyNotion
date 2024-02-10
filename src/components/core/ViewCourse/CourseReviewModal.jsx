import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import IconBtn from '../../common/IconBtn';
import {createRating} from '../../../services/operations/courseDetailsAPI'
import { RxCross1 } from "react-icons/rx"

function CourseReviewModal({setReviewModal}) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const {courseEntireData} = useSelector((state) => state.viewCourse);

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, [])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  }

  const onSubmit = async(data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  }
  return (
    <>
      <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        {/* header */}
        <div className="w-11/12 max-w-[450px]  border border-richblack-400 bg-richblack-800 rounded-lg">
        <div className='flex justify-between items-center px-4 py-2 bg-richblack-700 rounded-t-lg border-b-[2px] border-richblack-300'>
          <p  className='text-white'>Add Reviews</p>
          <button onClick={() => setReviewModal(false)} className='text-white font-bold'>
            <RxCross1 />
          </button>
        </div>
        {/* modal body */}
        <div className='flex flex-col items-center text-white'>
          <div className='flex flex-col items-center mt-4'>
            <img 
              src={user?.image}
              alt='user Image'
              className='aspect-square  w-[50px] rounded-full object-cover'
              />
              <div>
                <p className='text-center'>{user?.firstName} {user?.lastName}</p>
                <p>Posting Publicly</p>
              </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ReactStars 
            count = {5}
            onChange={ratingChanged}
            size={24}
            activeColor="ffd700"
            className='flex items-center justify-center'
            />

            <div className=' my-4'>
              <label htmlFor='courseExperience'>
                Add Your Experience<sup className="text-pink-200">*</sup>
              </label>
              <textarea
                  id='courseExperience'
                  placeholder='Add your Experience here'
                  {...register("courseExperience", {required:true})}
                  className='bg-richblack-700 text-white p-2 resize-x-none min-h-[130px] w-full'
              />
              {
                errors.courseExperience && (
                  <span className="ml-2 text-xs tracking-wide text-pink-200">
                    Please add your experience
                  </span>
                )
              }
            </div>

            {/* cancel and save button */}
            <div className='flex justify-between mb-4 font-medium'>
              <button onClick={() => setReviewModal(false)} className='bg-richblack-700 px-6 py-2 rounded-lg'>
                Cancel
              </button>
              <IconBtn text="save"  customClasses="bg-yellow-50 px-6 py-2 rounded-lg text-black"/>
            </div>

          </form>
        </div>

        </div>
        
      </div>

    </>
  )
}

export default CourseReviewModal