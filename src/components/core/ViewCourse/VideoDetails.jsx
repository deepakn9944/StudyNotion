import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"
import {AiFillPlayCircle} from "react-icons/ai"
import IconBtn from '../../common/IconBtn';

function VideoDetails() {
  const {token} = useSelector((state) => state.auth);
  const {courseId, sectionId, subSectionId} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async() => {
      console.log(courseSectionData);
      if(!courseSectionData.length)
          return;
        if(!courseId && !sectionId && !subSectionId){
          navigate("/dashboard/enrolled-courses");
        }
        else{
          const filterData = courseSectionData.filter(
            (section) => section._id === sectionId
          )

          const filterVideoData = filterData?.[0].subSection.filter(
            (data) => data._id === subSectionId
          )

          setVideoData(filterVideoData[0]);
          setVideoEnded(false);
        }
    }
    setVideoSpecificDetails();
  },[courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true;
    }
    else return false;
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    
    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSectionIndex === courseSectionData.length-1 && 
      currentSubSectionIndex === noOfSubSection-1){
      return true;
    }
    else return false;
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== noOfSubSection-1){
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex+1].subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
      (data) => data._id === subSectionId
    )

    if(currentSubSectionIndex !== 0){
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex -1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async() => {
    setLoading(true);

    const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);

    if(res){
      dispatch(updateCompletedLectures(subSectionId));
    }


    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {
        !videoData ? (
          <div>No Data Found</div>
        ):(
          <Player
          ref = {playerRef}
          aspectRatio='16:9'
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
          className=''
          >
          <BigPlayButton position="center" />

          {
            videoEnded && (
              <div className="fixed inset-0 z-[1000] !mt-0 flex flex-col gap-2 justify-center items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
                {
                  !completedLectures.includes(subSectionId) && 
                  (
                    <IconBtn
                      disabled={loading}
                      onClick={() => handleLectureCompletion()}
                      text={!loading ? "Mark As Completed" : "Loading..."}
                      customClasses='px-6 py-2 bg-yellow-50 text-black text-lg rounded-lg'
                      />
                  )
                }

                <IconBtn
                  disabled={loading}
                  onClick={() => {
                    if(playerRef?.current) {
                      playerRef.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses='px-6 py-2 bg-[green] text-white text-lg rounded-lg'
                  />

                  <div className='flex gap-2'>
                    {!isFirstVideo() && (
                      <button 
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className='px-6 py-2 bg-richblack-700 text-white text-lg rounded-lg'
                      >
                        Prev
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button disabled={loading}
                      onClick={goToNextVideo}
                      className='px-6 py-2 bg-richblack-700 text-white text-lg rounded-lg'
                      >
                        Next
                      </button>
                    )

                    }
                  </div>
              </div>
            )
          }  

          </Player>
        )}

    </div>
  )
}

export default VideoDetails