import React from 'react'



const stats = [
    {
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    },
]


function StatsComponent() {
  return (
    <div className='bg-richblack-700'>
    <div className='md:grid-cols-4 grid grid-cols-2 gap-10 py-10 mt-[100px] w-10/12 mx-auto'>
    {
        stats.map((stat, index) => (
            <div key={index} className='flex flex-col items-center w-full'>
            <div className='text-white font-bold text-3xl'>{stat.count}</div>
            <div className='text-richblack-400  font-semibold text-lg'>{stat.label}</div>
            </div>
        ))
    }
    </div>
</div>
  )
}

export default StatsComponent