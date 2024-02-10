import React from "react";
import {FaArrowRight} from 'react-icons/fa';
import { Link } from "react-router-dom";
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import "./Home.css"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider";



const Home = () => {
    return(
        <div >
            {/* -------------------------------- Section 1 ------------------------------- */}
            <div className="relative mx-auto flex flex-col w-11/12 sm:items-center items-start text-white justify-between">
                
                <Link to={"/signup"}>
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 ">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>


                <div className="sm:text-center text-4xl font-semibold mt-7">
                    Empower Your Future with
                    <HighLightText text={"coding Skills"} />
                </div>

                <div className="mt-4 sm:w-[70%] sm:text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>

                <div className="flex flex-row items-center gap-7 mt-8 mx-auto">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>

                </div>

                <div style={{boxShadow: "20px 20px white, 0 0 35px 2px #318CE7"}} className="shadow-blue-200 mx-3 mt-12 sm:w-[75%] w-[90%] video-shadow">
                    <video muted loop autoPlay>
                        <source src={Banner} type="video/mp4" />

                    </video>
                </div>

                {/* code section 1 */}
                <div className="sm:w-11/12 z-0 w-[100%] ">
                    <CodeBlocks position={"lg:flex-row flex-col"} gradient={"codeblock1"} heading={<div className="text-4xl font-semibold">
                        Unlock your <HighLightText text={"coding potential"} /> with our online courses. 
                        </div>}
                        subheading={`Our courses are designed and taught by industry experts
                        who have years of experience in coding and are passionate about sharing
                        their knowledge with you.`} 
                        ctabtn1={{
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active: true,
                        }} ctabtn2={{
                            btnText:"Learn More",
                            linkto:"/login",
                            active: false,
                        }} 
                        codeblock={
                            `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav> `
                        }
    
                        codeColor={"text-yellow-25"}/>
                </div>

                 {/* code section 2 */}
                <div  className="sm:w-11/12 w-[100%]">
                    <CodeBlocks position={"lg:flex-row-reverse flex-col"} gradient={"codeblock2"} heading={<div className="text-4xl font-semibold">
                        Start <HighLightText text={`coding `} /> <br/> <HighLightText text={`in seconds`} />
                        </div>}
                        subheading={`
                        Go ahead, give it a try. Our hands-on learning environment 
                        means you'll be writing real code from your very first lesson.`} 
                        ctabtn1={{
                            btnText:"Try it Yourself",
                            linkto:"/signup",
                            active: true,
                        }} ctabtn2={{
                            btnText:"Learn More",
                            linkto:"/login",
                            active: false,
                        }} 
                        codeblock={
                            `<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav> `
                        }
    
                        codeColor={"text-yellow-25"}/>
                </div>

                <ExploreMore />
            </div>

            {/* -------------------------------- Section 2 ------------------------------- */}
            <div className="bg-pure-greys-5 text-richblack-700 z-0">


                <div className="homepage_bg h-[310px] z-0">
                    <div className="w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto">
                        <div className="h-[150px]"></div>
                        <div className="flex sm:flex-row flex-col gap-6">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex gap-3 items-center">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div className="flex items-center justify-center text-white">
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>

                    </div>

                </div>


                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">
                
                    <div className="flex lg:flex-row flex-col gap-10 mt-[100px]">
                        <div className="text-4xl font-semibold lg:w-[45%]">
                            Get the skills you need for a
                            <HighLightText text={"job that is in demand."} />
                        </div>

                        <div className="flex flex-col gap-10 lg:w-[40%] items-start">
                            <div className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms.Today, to be a competitive
                            specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>

                            </CTAButton>
                        </div>

                    </div>


                    <TimelineSection />

                    <LearningLanguageSection />

                </div>


            </div>
            
            {/* -------------------------------- Section 3 ------------------------------- */}

            <div className="w-11/12  mx-auto max-w-content flex-col items-center justify-between gap-8 first-letter
            bg-richblack-900 text-white">

                <InstructorSection />

                <h2 className="text-center text-4xl font-semibold mt-10 mb-2">Review from other learners</h2>

                <ReviewSlider />

            </div>
            {/* -------------------------------- Footer ------------------------------- */}
            <Footer />

        </div>
    )
}

export default Home;




//https://www.figma.com/file/o9ALMUNq9vjfvdfwI8RCwF/StudyNotion_shared-(Copy)?type=design&node-id=11167-17977&mode=design&t=0RUgLul15DPK8PR7-0