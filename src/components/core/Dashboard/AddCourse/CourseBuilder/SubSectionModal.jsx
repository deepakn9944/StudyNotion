import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import { setCourse } from "../../../../../slices/courseSlice"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI"

function SubSectionModal({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        getValues,
    } = useForm()


    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)

    useEffect(() => {
        if (view || edit) {
          // console.log("modalData", modalData)
          setValue("lectureTitle", modalData.title)
          setValue("lectureDesc", modalData.description)
          setValue("lectureVideo", modalData.videoUrl)
        }
      }, [])

      const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
          currentValues.lectureDesc !== modalData.description ||
          currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
          }
          else{
            return false;
          }
      }
       

      const handleEditSubSection = async(data) => {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentValues.lectureTitle !== modalData.title) {
          formData.append("title", currentValues.lectureTitle);
        }
        if(currentValues.lectureDesc !== modalData.description){
          formData.append("description", currentValues.lectureDesc);
        }
        if(currentValues.lectureVideo !== modalData.videoUrl) {
          formData.append("video", currentValues.lectureVideo);
        }
        setLoading(true);
        const result = await updateSubSection(formData, token);
        if(result){
          const updatedCourseContent = course.courseContent.map((section) => 
          section._id === modalData.sectionId ? result : section)
          const updatedCourse = { ...course, courseContent: updatedCourseContent}
          dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
      }


      const onSubmit = async (data) => {
        if(view)
          return;
        if(edit){
          if(!isFormUpdated){
            toast.error("No changes made to the form")
          }
          else{
            handleEditSubSection();
          }
          return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);
        const result = await createSubSection(formData, token);

        if(result){
          const updatedCourseContent = course.courseContent.map((section) => 
          section._id === modalData ? result : section)
          const updatedCourse = { ...course, courseContent: updatedCourseContent}
          dispatch(setCourse(updatedCourse));

        }
        setModalData(null);
        setLoading(false);

      }

      
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[650px] bg-richblack-800 p-[50px]">
        <div className="flex justify-between mb-4 text-2xl">
          <p className='text-richblack-5 font-semibold'>
            {view && "Viewing" } {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors} 
            video={true}
            viewData={view ? modalData.videoUrl: null}
            editData={edit ? modalData.videoUrl: null}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="lectureTitle" className='text-richblack-5 font-semibold'>
              Lecture Title
              <sup className='text-pink-200'>*</sup>
            </label>
            <input 
                id='lectureTitle'
                placeholder="Enter Lecture Title"
                {...register("lectureTitle", {required:true})}
                className='w-full bg-richblack-700 py-2 px-4 rounded-lg border-b-[1px]
                border-richblack-5 text-richblack-100'
            />
            {errors.lectureTitle && (
              <span className='text-pink-200'>Lecture Title is required**</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
          <label htmlFor="lectureDesc" className='text-richblack-5 font-semibold'>
            Lecture Description
            <sup className='text-pink-200'>*</sup>
          </label>
          <textarea
            id='lectureDesc'
            placeholder= "Enter Lecture Description"
            {...register("lectureDesc", {required: true})}
            className='text-richblack-5 min-h-[130px] w-full bg-richblack-700 py-2 px-4
            rounded-lg border-b-[1px] border-richblack-5'
          />
           {errors.lectureDesc && (
              <span className='text-pink-200'>Lecture Description is required**</span>
            )}
          </div>
          {
            !view && (
              <div className="text-black flex justify-end">
                <IconBtn 
                    text={loading ? "Loading...." : edit ? "Save Changes" : "Save"}
                    bgColor={"yellow-50"} 
                />
              </div>
            )
          }
        </form>
      </div>
    </div>
  )
}

export default SubSectionModal