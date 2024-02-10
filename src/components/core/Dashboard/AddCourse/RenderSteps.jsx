import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from 'react-icons/fa'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import CourseInformationForm from './CourseInformationForm/CourseInformationForm'
import PublishCourse from './PublishCourse'

function RenderSteps() {
    const { step } = useSelector((state) => state.course)

    const steps = [
        {
            id : 1,
            title : "Course Information",
        },
        {
            id : 2,
            title : "Course Builder",
        },
        {
            id : 3,
            title : "Publish",
        },
    ]
  return (
    <>
        <div className='flex mt-6 ml-12'>
            {steps.map((item) => (
                <div className='text-richblack-200 lg:flex hidden items-center text-sm'>
                    <div >
                        <div  className={`${step > item.id ? "text-yellow-900 bg-yellow-50 ":""} 
                        ${step === item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50" : 
                        "bg-richblack-800 border-richblack-700 text-richblack-300"} w-[34px]
                        flex items-center justify-center rounded-full aspect-square border-[1px]`}>
                            {
                                step > item.id ? (<FaCheck />) : (item.id)   
                            }
                        </div>
                    </div>
                   
                        {item.id < steps.length && <div className={`${step > item.id ? ("border-yellow-50")
                        :("border-richblack-300")} h-[1px] border-dashed w-[180px] border-b-2`}></div>
                        }

                    
                </div>
            ))}
        </div>

        <div className='lg:flex justify-between text-richblack-300 gap-x-8 hidden'>
            {steps.map((item) => (
                    <>
                        <div className='w-4/12 text-center mb-4'>
                            <p className='text-sm'>{item.title}</p>
                        </div>
                    </>
                ))
            }
        </div>

        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
    </>
  )
}

export default RenderSteps