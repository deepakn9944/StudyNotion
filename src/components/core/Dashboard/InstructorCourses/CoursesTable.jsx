import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { HiCheckBadge } from "react-icons/hi2"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';

function CoursesTable({courses, setCourses}) {

    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const TRUNCATE_LENGTH = 30
    const navigate = useNavigate();

    const handleCourseDelete = async(courseId) => {
        setLoading(true);
        await deleteCourse({courseId: courseId}, token);
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);

    }


  return (
    <div className=' border-[1px] border-richblack-800 rounded-xl'>
         <Table className="text-richblack-5 w-full text-left text-sm ">
            <Thead className=' border-b-[1px] border-richblack-800 text-richblack-100'>
                <Tr className="flex lg:gap-x-10 gap-x-4 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                    <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                    <span > COURSES</span>
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100 ">
                       <span > DURATION</span>
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100 ">
                    <span > PRICE</span>
                    </Th>
                    <Th className="text-left text-sm font-medium uppercase text-richblack-100 ">
                    <span > ACTIONS</span>
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length === 0 ? (
                        <Tr>
                        <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                          No courses found
                          {/* TODO: Need to change this state */}
                        </Td>
                      </Tr>
                     
                    ) : (
                        courses?.map((course) => (
                            <Tr key={course._id}
                            className="flex  lg:gap-x-12 gap-x-6 border-b border-richblack-800 px-6 py-8">
                                <Td className="flex  flex-1 gap-x-4"> 
                                        <img src={course?.thumbnail}
                                        className='h-[150px] w-[220px] object-cover rounded-lg'
                                        />
                                    
                                    <div  className="flex flex-col justify-between">
                                        <p className="text-lg font-semibold text-richblack-5">{course.courseName}</p>
                                        <p className="text-xs text-richblack-300">
                                        {course.courseDescription.split(" ").length >
                                        TRUNCATE_LENGTH
                                            ? course.courseDescription
                                                .split(" ")
                                                .slice(0, TRUNCATE_LENGTH)
                                                .join(" ") + "..."
                                            : course.courseDescription}
                                        </p>
                                        <p className="text-[12px] text-white">Created: </p>
                                        {course.status === COURSE_STATUS.DRAFT ? (
                                            <p className='text-[12px] text-pink-100 flex items-center gap-2 bg-richblack-700 px-2 py-1 rounded-full'>
                                                <HiClock size={14}/>Drafted</p>
                                        ):(
                                            <p className='text-[12px] text-yellow-50 flex w-fit items-center gap-2 bg-richblack-700 px-2 py-1 rounded-full'>
                                                <HiCheckBadge size={14}/>Published</p>
                                        )}
                                    </div>

                                </Td>
                                <Td className="text-sm font-medium text-richblack-100">
                                    2hr 30min
                                </Td>
                                
                                <Td className="text-sm font-medium text-richblack-100">
                                    ${course.price}
                                </Td>
                                <Td className=" text-richblack-100 font-medium text-2xl">
                                    <button disabled={loading} className='mr-3 hover:text-[lightgreen]'
                                    onClick={() => {
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }}>
                                        <FiEdit2 size={20}/>
                                    </button >
                                    <button disabled={loading}
                                    className='hover:text-[#ff0000]'
                                    onClick={() =>{
                                        setConfirmationModal({
                                            text1: "Do you want to delete this course?",
                                            text2:"All the data related to this course will be deleted.",
                                            btn1Text: "Delete",
                                            btn2Text: "cancel",
                                            btn2Handler: !loading ? ()=>setConfirmationModal(null) : ()=>{},
                                            btn1Handler: !loading ? ()=>handleCourseDelete(course._id) : ()=>{}
                                        })
                                    }}>
                                        <RiDeleteBin6Line  size={20} />
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>

         </Table>
         {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CoursesTable