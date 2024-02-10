import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import RequirementField from './RequirementField';
import ChipInput from './ChipInput';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';
import { MdNavigateNext } from "react-icons/md"

import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice"
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from "../../../../../utils/constants"


function CourseInformationForm() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}, 
    } = useForm();

    
    const { token } = useSelector((state) => state.auth)
    const { step } = useSelector((state) => state.course)
    const dispatch = useDispatch();
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(()=>{
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            
            setLoading(false);
        }
        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("coursebenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }

        getCategories();
    }, [])


    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
           currentValues.courseShortDesc !== course.courseDescription ||
           currentValues.coursePrice !== course.price ||
           currentValues.courseTags.toString() !== course.tag.toString() ||
           currentValues.coursebenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
           currentValues.courseRequirements.toString() !== course.instructions.toString()
            )
            return true;
        else 
            return false;
    }

    //handle next button click
    const onSubmit = async(data) => {
        if(editCourse) {
            if(isFormUpdated()){
                const currentValues = getValues();
            const formData = new FormData();

            formData.append("courseId", course._id);
            if (currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle)
              }
              if (currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("courseDescription", data.courseShortDesc)
              }
              if (currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice)
              }
              if (currentValues.courseTags.toString() !== course.tag.toString()) {
                formData.append("tag", JSON.stringify(data.courseTags))
              }
              if (currentValues.coursebenefits !== course.whatYouWillLearn) {
                formData.append("whatYouWillLearn", data.coursebenefits)
              }
              if (currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory)
              }
              if (
                currentValues.courseRequirements.toString() !==
                course.instructions.toString()
              ) {
                formData.append(
                  "instructions",
                  JSON.stringify(data.courseRequirements)
                )
              }
              if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
              }

              setLoading(true);
              const result = await editCourseDetails(formData, token);
              setLoading(false);
              
              if(result){
                dispatch(setStep(2))
                dispatch(setCourse(result))
              }
            }
            else {
                toast.error("No Changes is found")
            }
            return
        }
       console.log(data.courseCategory);
        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag",  JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.coursebenefits)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("category", data.courseCategory)
        formData.append("thumbnailImage", data.courseImage)
        formData.append("status", COURSE_STATUS.DRAFT)
       
        setLoading(true);
        const result = await addCourseDetails(formData, token);
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false);

    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
    className='rounded-md  border-[1px] border-richblack-700 bg-richblack-800 p-6 space-y-8'>
        <div className='flex flex-col gap-2'>
            <label htmlFor='courseTitle' className='text-richblack-5 font-semibold'>
            Course Title<sup className='text-pink-200'>*</sup></label>
            <input 
                id="courseTitle"
                placeholder='Enter Course Title'
                {...register('courseTitle', {required: true})}
                className='text-richblack-5 w-full bg-richblack-700 py-2 px-4 rounded-lg
                border-b-[1px] border-richblack-5'
            />
            {
            errors.courseTitle && (
                <span className="text-pink-200 text-xs">
                    Course Title is Required**
                </span>
            ) }
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor='courseShortDesc' className='text-richblack-5 font-semibold'>
            Course Short Description<sup className='text-pink-200'>*</sup></label>
            <textarea
                id="courseShortDesc"
                placeholder='Enter Description'
                {...register('courseShortDesc', {required: true})}
                className='text-richblack-5 min-h-[140px] w-full bg-richblack-700 py-2 px-4
                rounded-lg border-b-[1px] border-richblack-5'
            />
            {
            errors.courseShortDesc && (
                <span className="text-pink-200 text-xs">
                    Course Short Description is Required**
                </span>
            ) }
        </div>

        <div className='relative flex flex-col gap-2'>
            <label htmlFor='coursePrice' className='text-richblack-5 font-semibold'>
            Course Price<sup className='text-pink-200'>*</sup></label>
            <div className='relative'>
                <input
                
                id="coursePrice"
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required: true,
                    valueAsNumber:true
                })}
                className='text-richblack-5 w-full bg-richblack-700 py-2 px-12 rounded-lg border-b-[1px]
              border-richblack-5'
                />
                <HiOutlineCurrencyRupee className=' absolute text-richblack-200 top-[6px] left-[6px] 
                h-[28px] w-[28px]'/>
            </div>
            
            {
                errors.coursePrice && (
                    <span className="text-pink-200 text-xs">Course Price is Required**</span>
                )
            }
        </div>

        <div className='flex flex-col gap-2'>
            <label className='text-richblack-5 font-semibold'>
            Course Category<sup className='text-pink-200'>*</sup></label>
            <select 
                id="courseCategory"
                defaultValue=""
                {...register("courseCategory", {required:true})}
                className='w-full bg-richblack-700 py-2 px-4 rounded-lg border-b-[1px]
                border-richblack-5 text-richblack-5'
            >
                <option value="" disabled className='text-richblack-5'>Choose a Category</option>
                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>{category?.name}</option>
                    ))
                }
                
            </select>
            {
                errors.courseCategory && (
                    <span className="text-pink-200 text-xs">Course Category is Required**</span>
                )
            }
            
        </div>

        <ChipInput
        label="Tags"
        name="courseTags"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues} 
        />

        <Upload
        label="Course Thumbnail"
        name="courseImage"
        register={register}
        errors={errors}
        setValue={setValue}
        editData={editCourse ? course?.thumbnail : null}
        />

        <div className='flex flex-col gap-2'>
            <label htmlFor='coursebenefits' className='text-richblack-5 font-semibold'>
            Benefits of the course<sup className='text-pink-200'>*</sup></label>
            <textarea
                id="coursebenefits"
                placeholder='Enter Benefits of the course'
                {...register('coursebenefits', {required: true})}
                className='text-richblack-5 min-h-[130px] w-full bg-richblack-700 py-2 px-4
                rounded-lg border-b-[1px] border-richblack-5'
            />
            {
            errors.coursebenefits && (
                <span className="text-pink-200 text-xs">
                    Benefits of the course is Required**
                </span>
            ) }
        </div>

        <RequirementField 
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        />

        <div className='flex justify-between'>
             {
                editCourse && (
                    <button
                    onClick={() => dispatch(setStep(2))}
                    disabled={loading}
                    className='bg-richblack-500 flex items-center gap-x-2 px-5 py-2 rounded-lg font-semibold'>
                        Continue Without Saving
                    </button>
                )
             }

             <div className='flex justify-end'>
                <IconBtn 
                disabled={loading}
                text={!editCourse ? "Next" : "Save Changes"} 
                customClasses={"bg-yellow-50 font-semibold px-5 py-2 flex rounded-md gap-x-2 items-center "}
                > <MdNavigateNext/> </IconBtn>
             </div>
                
        </div>
    </form>
  )
}

export default CourseInformationForm