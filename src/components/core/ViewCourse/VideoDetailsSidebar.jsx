import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { AiOutlineDown } from "react-icons/ai"
import { courseEndpoints } from '../../../services/apis';
import { IoIosArrowBack } from "react-icons/io"
import { IoAddCircleOutline } from "react-icons/io5"

function VideoDetailsSidebar({setReviewModal}) {

    const [activeStatus, setActiveStatus] = useState("");
    const [videobarActive, setVideobarActive] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const {sectionId, subSectionId} = useParams();
    const [active, setActive] = useState(false);
    const{
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);
    
    useEffect(() => {
        const setActiveFlags =() => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            console.log(completedLectures);
            
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            //set current section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current subsection
            setVideobarActive(activeSubSectionId);

        } 
        setActiveFlags();

    }, [courseSectionData, courseEntireData, location.pathname])

    const handleAddReview = () => {
        console.log("I am inside Add handleAddReview");
        setReviewModal(true);
    }
  return (
    <>
    <div className='bg-richblack-800 h-[calc(100vh-3.5rem)] text-richblack-25 py-8 font-semibold text-[14px] w-[15%]'>
        {/* buttons and heading */}
        <div >
            {/* buttons */}
            <div className='flex  flex-col gap-2 px-6'>
                <div onClick={() => {
                    navigate("/dashboard/enrolled-courses")
                }} className='bg-richblack-600 px-6 py-2 rounded-lg flex  justify-center items-center'>
                    <IoIosArrowBack size={20} />
                    Back
                    
                </div>
                <div>
                <IconBtn 
                    text="Add Review"
                    onClick={() => handleAddReview()}
                    customClasses="px-6 py-2 bg-yellow-50 text-[black] rounded-lg flex gap-2 justify-center items-center w-full"
                ><IoAddCircleOutline size={20} className="text-black font-bold" /></IconBtn>
                </div>
            </div>
            
            {/* heading */}
            <div className='flex justify-center items-center gap-3 text-richblack-600 py-2'>
                <p className='text-richblack-25'>{courseEntireData?.courseName}</p>
                <p className='text-[#00ff00e1]'>{completedLectures?.length}/{totalNoOfLectures}</p>
            </div>
            <div className="border-[1px] text-richblack-300 w-full"></div>
        </div>

        {/* section and subSections */}
        <div>
            {
                courseSectionData.map((section, index) => (
                    <div 
                    key={index}
                    >
                        {/* section */}
                        <div className='flex justify-between items-center bg-richblack-600 px-4 py-2'>
                            <div onClick={() => setActiveStatus(section?.id)}>
                                {section?.sectionName}
                            </div>
                            <span
                            className={`${
                            activeStatus === section?.sectionName
                                ? "rotate-0"
                                : "rotate-180"
                            } transition-all duration-500`}
                        >
                            <AiOutlineDown/>
                        </span>
                                    
                            
                        </div>
                        {/* subsections */}
                        <div className='flex'>
                            {
                                activeStatus === section?._id && (
                                    <div className='w-full'>
                                        {
                                            section.subSection.map((topic, index) => (
                                                <div
                                                className={`${
                                                    videobarActive === topic._id
                                                    ? "bg-yellow-200 text-richblack-900"
                                                    : "bg-richblack-900 text-white"
                                                } w-full flex gap-2 justify-center items-center
                                                
                                                `} 
                                                key={index}
                                                onClick={() => {
                                                    navigate(
                                                        `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                                    )
                                                }}
                                                >
                                                    <input 
                                                    type='checkbox'
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => {}}/>
                                                    <span>{topic.title}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>


                    </div>

                ))
            }
        </div>
    </div>

    </>
  )
}

export default VideoDetailsSidebar