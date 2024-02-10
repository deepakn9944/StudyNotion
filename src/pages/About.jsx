import React from 'react'
import HighLightText from '../components/core/HomePage/HighLightText'
import aboutUs_Image1 from "../assets/Images/aboutus1.webp"
import aboutUs_Image2 from "../assets/Images/aboutus2.webp"
import aboutUs_Image3 from "../assets/Images/aboutus3.webp"
import FoundingStoryImage from "../assets/Images/FoundingStory.png"
import Button from '../components/core/HomePage/Button'
import Quote from '../components/core/AboutUs/Quote'
import StatsComponent from '../components/core/AboutUs/StatsComponent'
import LearningGrid from '../components/core/AboutUs/LearningGrid'
import ContactForm from '../components/core/AboutUs/ContactForm'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'


function About() {
  return (
    <div className='w-full'>
        {/* Section 1 */}
       <div className='w-full  flex flex-col items-center bg-richblack-800 relative '>
            <div className='w-11/12 flex flex-col items-center mx-auto mt-[5%]'>
                <h1 className='text-richblack-5 font-semibold lg:text-4xl md:text-3xl text-2xl text-center md:w-[60%]'>Driving Innovation in Online Education for a <HighLightText text={"Brighter Future"}/></h1>
                <p className='text-richblack-400 text-center lg:w-[60%] mt-4'>Studynotion is at the forefront of driving innovation in online education. 
                    We're passionate about creating a brighter future by offering cutting-edge courses, 
                    leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
                <div className='lg:h-[300px]  md:h-[200px] h-[150px]'></div>
            </div>
            <div className='grid grid-cols-3 gap-3 lg:gap-5 absolute bottom-0 translate-y-[20%]' >
                <img src={aboutUs_Image1} alt="" />
                <img src={aboutUs_Image2} alt=""/>
                <img src={aboutUs_Image3} alt=""/>
            </div>
            {/* <div className='grid grid-cols-3 gap-3 w-[80%] bottom-0 translate-y-[10%] left-[50%] translate-x-[-50%] lg:gap-5'>
           
            </div> */}
            
       </div>

       {/* section 2 */}
       <Quote />

       {/* section 3 */}
       <div className='w-11/12 mt-[150px] mx-auto'>
        <div className='lg:w-[90%] mx-auto flex lg:flex-row flex-col gap-32'>
            <div className='lg:w-[55%] flex flex-col text-richblack-200 gap-5'>
                <h1 className='bg-gradient-to-br from-[#833AB4] from-30% via-[#FD1D1D] via-30%  to-[#FCB045] to-90% 
                text-transparent bg-clip-text text-4xl font-bold '>Our Founding Story </h1>
                <p className='lg:w-[90%]  text-md'>Our e-learning platform was born out of a shared vision and passion for transforming education. 
                    It all began with a group of educators, technologists, and lifelong learners who recognized the need for
                    accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>
                <p className='lg:w-[90%] text-md'>
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional
                education systems.We believed that education should not be confined to the walls of a classroom 
                or restricted by geographical boundaries. We envisioned a platform that couldbridge these gaps
                and empower individuals from all walks of life to unlock their full potential.
                </p>

            </div>
            <div className='my-auto mx-auto'>
                <img src={FoundingStoryImage} alt="founding Story" width={500} height={400} className='shadow-[0_0_8px_3px] shadow-[#FC6767]'/>
            </div>
        </div>
       </div>

        {/* section 4 */}
        <div className='w-11/12 mt-[150px] mx-auto'>
            <div className='lg:w-[90%] mx-auto flex lg:flex-row flex-col gap-32'>
                <div className='lg:w-[70%] flex flex-col text-richblack-200 gap-5'>
                    <h1 className='bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] 
                    text-transparent bg-clip-text text-4xl font-bold '>Our Vision</h1>
                    <p className='lg:w-[90%] text-md'>With this vision in mind, we set out on a journey to create 
                    an e-learning platform that would revolutionize the way people learn. Our team of dedicated 
                    experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge 
                    technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                    

                </div>
                <div className='lg:w-[60%] flex flex-col text-richblack-200 gap-5'>
                    <h1 className='bg-gradient-to-br from-[#E65C00]  to-[#F9D423] 
                        text-transparent bg-clip-text text-4xl font-bold '>Our Vision</h1>
                    <p className='lg:w-[100%] text-md'>
                        our mission goes beyond just delivering courses online. We wanted to create a
                        vibrant community of learners, where individuals can connect, collaborate, and
                        learn from one another. We believe that knowledge thrives in an environment of 
                        sharing and dialogue, and we foster this spirit of collaboration t
                        hrough forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
       </div>
       {/* section 5 */}
       <StatsComponent />
      

       {/* section 6 */}
       <LearningGrid />

       {/* section 7 */}
       <div className='w-[60%] mx-auto'>
        <ContactForm />
       </div>
       
       <div className='w-11/12 mx-auto'>
        <h2 className="text-center text-4xl font-semibold mb-2 text-white mt-[100px]">Review from other learners</h2>
        <ReviewSlider />
       </div>

       <Footer />

    </div>
  )
}

export default About