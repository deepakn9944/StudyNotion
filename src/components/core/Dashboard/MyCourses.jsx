import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import {  AiOutlinePlus } from "react-icons/ai"
import CoursesTable from "../Dashboard/InstructorCourses/CoursesTable"
function MyCourses() {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    
    
    useEffect(() => {
        const fetchCourses = async() => {
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
                console.log("Instr", result);
            }
        }
        fetchCourses()

    }, [])
  return (
    <div className="text-richblack-5 w-full">
        <div className='flex justify-between mb-10'>
            <h1 className='text-3xl font-semibold'>My Courses</h1> 
            <IconBtn 
                text="Add Courses"
                onClick={() => navigate("/dashboard/add-course")}
                customClasses={`bg-yellow-50 text-md font-semibold text-[black] 
                flex flex-row-reverse items-center px-5 py-2 rounded-lg gap-2`}>
                    <AiOutlinePlus />
                </IconBtn>
        </div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}

export default MyCourses