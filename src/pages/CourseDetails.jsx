import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../services/operations/stundentFeaturesApi';
import GetAvgRating from '../utils/avgRating';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from "../components/common/RatingStars"
import { formatDate } from '../services/operations/formatDate';
import CourseCardDetails from '../components/core/course/CourseCardDetails';
import {BsGlobe2} from "react-icons/bs"
import { BiInfoCircle } from "react-icons/bi"
import { AiOutlineDown } from "react-icons/ai"
import { HiOutlineVideoCamera } from "react-icons/hi"
 

function CourseDetails() {
    const {courseId} = useParams();
    const { token } = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course); 
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0); 
    const [isActive, setIsActive]  = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
            ? isActive.concat(id)
            : isActive.filter((e) => e != id)
        )
    }

    useEffect(() => {
            const getCourseFullDetails = async() => {
                try{
                    const res = await fetchCourseDetails(courseId);
                    setCourseData(res);
                    
                }catch(error){
                    console.log("Could not fetch Course Details");
                }
            }
            getCourseFullDetails();
        console.log("here" ,courseData);
    },[])


    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData])

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((section) => {
             lectures += section.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
    }, [courseData])

    const handleBuyCourse = () => {
        if(token) {
           buyCourse(token, [courseId], user, navigate, dispatch);
           return;
        }
        else{
            setConfirmationModal({
                text1:"Your are not login",
                text2:"Please login to purchase course",
                btn1Text:"Login",
                btn2Text:"Cancel",
                btn1Handler:() => navigate("/login"),
                btn2Handler:() => setConfirmationModal(null),
            })
        }

    }

    

    if(loading || !courseData){
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(!courseData.success){
        return(
            <div>Error</div>
        )
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentEnrolled,
        category,
        createdAt,

    } = courseData?.data?.courseDetails;

  return (
    <div className='text-richblack-5'>
        <div className='bg-richblack-800 relative  pl-[50px] py-[50px] flex flex-col gap-2'>
            
            <p className='text-richblack-300'>Home / Learning / <span className='text-yellow-50'>
                {category.name}</span></p>
            <p className='w-[75%] text-3xl text-richblack-5'>{courseName}</p>
            <p className='text-richblack-300'>{courseDescription}</p>
            <div className='flex gap-x-5'>
                <span className='flex'>{avgReviewCount}
                <RatingStars Review_Count= {avgReviewCount} size={24} />
                </span>
                
                <span>{`${ratingAndReviews.length} Reviews`}</span>
                <span>{`${studentEnrolled.length} Students Enrolled`}</span>
            </div>

            <div className='flex gap-x-5'>
                
                <p>Created By {`${instructor.firstName}`}</p>
            </div>
            <div className='flex gap-x-5'>
                
                <p className='flex items-center gap-x-2'>
                <BiInfoCircle/>
                Created At {`${formatDate(createdAt)}`}
                </p>
                <p className='flex items-center gap-x-2'>
                <BsGlobe2 /> 
                English </p>
            </div>

            <CourseCardDetails course={courseData?.data?.courseDetails} 
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse = {handleBuyCourse} />

        </div>
        
        <div className='ml-[50px] p-5 border-[2px] border-richblack-700 w-[65%] my-[50px]'>
            <p className='text-2xl font-semibold mb-2'>What You Will Learn</p>
            <div className='font-medium'>
                {whatYouWillLearn}
            </div>
        </div>

        <div >
            <div>
                <p className='text-2xl font-semibold ml-[50px]'>Course Content:</p>
            </div>

            <div className='flex justify-between w-[68%]'>
                <div className='text-sm font-medium ml-[50px] flex gap-3 text-richblack-400'>
                    <span>{courseContent.length} section(s)</span>
                    <span>{totalNoOfLectures} lecture(s)</span>
                    <span>{courseData.data?.totalDuration} total length</span>
                </div>
                <div>
                    <button onClick={() => setIsActive([])} className='text-yellow-100'>
                        Collapse all sections
                    </button>
                </div>
            </div>

            <div className='ml-[50px] border-[2px] border-richblack-700 w-[65%] mt-2'>
                {
                    courseContent.map((section, index) => (
                        <div key={index}>
                            <div className={` py-5 flex justify-between px-6 bg-richblack-700 cursor-pointer `}  onClick={() => handleActive(section._id)}>
                                <p className='flex gap-x-2 items-center'>
                                <AiOutlineDown className={`${isActive.includes(section._id) ? "" : "rotate-180"}`}/>
                                {section.sectionName}</p>
                                <p className='text-yellow-100'>{section.subSection.length} lecture(s)</p>
                            </div>
                            <div className={`${isActive.includes(section._id) ? "" : "hidden"}`}>
                                {
                                    section.subSection.map((lecture, index) => (
                                        <div className=' py-5  px-6 cursor-pointer' key={index}>
                                            <div className='flex justify-between' onClick={() => handleActive(lecture._id)}>
                                                <p className='flex gap-x-2 items-center'>
                                                    <HiOutlineVideoCamera />
                                                    {lecture.title} 
                                                    <AiOutlineDown className={`${isActive.includes(section._id) ? "" : "rotate-180"}`}/>
                                                </p>
                                                <p>{lecture.timeDuration}</p>
                                            </div>
                                            <p className={`${isActive.includes(lecture._id) ? "flex" : "hidden"} 
                                             pl-6 w-[75%] text-sm text-richblack-100`}>{lecture.description}</p>
                                        </div>
                                        
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>


        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

export default CourseDetails