import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';


const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths"
];

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the<HighLightText text={"Power of Code"} />
        </div>

        <p className='text-center text-richblack-300 text-[16px] mt-3'>
            Learn to build anything you can imagine
        </p>

        <div className='mt-5 md:flex hidden rounded-full bg-richblack-800 mb-5 border-richblack-100 px-2 py-1'>
            {
                tabsName.map((element, index) => {
                    return(
                        <div className={`text-[16px] flex items-center gap-2
                        ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium"
                         : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                         hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`} key={index} onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='md:h-[200px] '>
            {/* course card group */}

            <div className='md:absolute flex md:flex-row flex-col md:gap-10 gap-6 justify-between mx-auto w-[80%] left-[10%] mt-[2%] -mb-[25%] md:mb-[0%]'>
                {
                    courses.map((element, index) => {
                        return (
                            <CourseCard
                            key={index}
                            cardData = {element}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>

        <div>

        </div>
    </div>
  )
}

export default ExploreMore