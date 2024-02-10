import React, { useEffect, useState } from 'react'
import { MdClose } from "react-icons/md"
import { useSelector } from 'react-redux';

function ChipInput({name, label, register, setValue, getValues, errors}) {

  const { editCourse, course } = useSelector((state) => state.course)
  const [tagList, setTagList] = useState([]);

    useEffect(() => {
      if(editCourse){
        setTagList(course?.tag)
      }
        register(name, {required: true, validate: (value) => value.length > 0 });
    }, [])

    useEffect(() => {
        setValue(name, tagList);
    }, [tagList])

    const handleAddTag = (event) => {
      if(event.key === "Enter" || event.key === ","){
        event.preventDefault()
        const chipvalue = event.target.value.trim()
        if(chipvalue && !tagList.includes(chipvalue)){
          const newList = [...tagList, chipvalue]
          setTagList(newList)
          event.target.value=""
        }
      }
    }

    const handleClearTag = (chipIndex) => {
      const updateTagList = tagList.filter((_, index) => index !== chipIndex)
      setTagList(updateTagList);

    }

  return (
    <div >
      <label htmlFor={name} className='text-richblack-5 font-semibold' >
        {label}<sup className='text-pink-200'>*</sup></label>
      {
        tagList.length > 0 && (<div className='flex'>
          {
            tagList.map((tag, index) => (
              <div key={index} className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 
              text-sm text-richblack-5 '>{tag}
                <button 
                type="button"
                className="ml-2 focus:outline-none"  onClick={()=>{handleClearTag(index)}}>
                  <MdClose className='text-sm'/>
                </button>
              </div>
            ))
          }
        </div>)
      }
      <input
      type="text"
      id={name}
      placeholder="Enter Tags and Press Enter"
      onKeyDown={(e) => handleAddTag(e)}
      className='text-richblack-5 w-full mt-2 bg-richblack-700 py-2 px-4 rounded-lg border-b-[1px]
      border-richblack-5'
      />
      {
        errors[name] && (
          <span className="text-pink-200 text-xs">{label} is required**</span>
        )
      }

    </div>
  )
}

export default ChipInput