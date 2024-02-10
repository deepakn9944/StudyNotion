
import RenderSteps from './RenderSteps'



function AddCourse() {
    
    
    
   
  return (
    <>
        <div className='flex justify-between max-w-[1000px] mx-auto'> 
            <div className='lg:w-[58%] w-full'>
                <h1 className="text-richblack-5 text-xl font-semibold">Add Course</h1>
                <div>
                    <RenderSteps />
                </div>
            </div>
            <div className='lg:w-[40%] bg-richblack-800 px-10 rounded-lg border-[1px] 
            border-richblack-700 h-fit py-6 w-0 lg:flex flex-col hidden '>
                
                <p className='text-richblack-5 text-lg pb-8 relative'>Code Upload Tips 
                <span className='absolute right-[100%]'>⚡</span></p>
                <ul className='text-richblack-5 text-xs flex flex-col gap-4 list-disc' >
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default AddCourse