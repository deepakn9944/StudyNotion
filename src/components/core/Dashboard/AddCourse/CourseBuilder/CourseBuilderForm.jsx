import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';

function CourseBuilderForm() {

  const {register, setValue, handleSubmit, formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const[loading, setLoading] = useState(false);

  const onSubmit = async(data) => {
    setLoading(true);
    let result;

    if(editSectionName){
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id
        }, token
      )
    }
    else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token)
    }

    //update values
    console.log("mera result", result);
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false)
  }
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section")
      return;
    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section")
      return;
    }

    dispatch(setStep(3));

  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  
  return (
    <div className='rounded-md  border-[1px] border-richblack-700
    bg-richblack-800 p-6 space-y-8'>
      <p className='text-richblack-5 text-md font-semibold'>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <label htmlFor='sectionName'  className='text-richblack-5 font-semibold'>
            Section name<sup className='text-pink-200'>*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required:true})}
            className='text-richblack-5 w-full bg-richblack-700 py-2 px-4 rounded-lg
            border-b-[1px] border-richblack-5'
          />
          {
            errors.sectionName && (<span>
              Please provide section name**
            </span>)
          }
        </div>
        <div className='mt-10 flex gap-6'>
          <IconBtn 
          type="submit"
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}
          customClasses={`text-richblack-400 flex flex-row-reverse outline outline-1 
          rounded-md outline-yellow-50 px-5 py-2 gap-1 items-center font-semibold text-richblack-5`}
          >
          <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button 
             type='button'
             onClick={cancelEdit}
             className='text-md text-richblack-300 underline'>
              Cancel Edit
             </button>
          )
          }
        </div>
      </form>
      {course.courseContent.length > 0 && (  
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
      )}
      <div className='flex justify-end gap-x-3'>
        <button 
         onClick={goBack}
         className={"bg-richblack-600 font-semibold px-5 py-2 flex rounded-md gap-x-2 items-center text-richblack-5"}>
          Back
         </button>
         <IconBtn text="Next" onClick={goToNext}
         customClasses={"bg-yellow-50 font-semibold px-5 py-2 flex rounded-md gap-x-2 items-center "}>
         <MdNavigateNext/>
         </IconBtn>
      </div>


    </div>
  )
}

export default CourseBuilderForm