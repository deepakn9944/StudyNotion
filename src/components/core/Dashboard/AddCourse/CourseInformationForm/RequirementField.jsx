import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function RequirementField({name, label, register, errors, setValue, getValues}) {

    const { editCourse, course } = useSelector((state) => state.course)
    const [requirement, setRequirement] = useState("")
    const [requirementList, setRequirementList] = useState([]);

    useEffect(()=>{
        if(editCourse){
            setRequirementList(course?.instructions)
        }
        register(name, {required:true, validate: (value) => value.length > 0 })
    },[])

    useEffect(()=>{
        setValue(name, requirementList)
    },[requirementList])

    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index, 1);
        setRequirementList(updateRequirementList);
    }

  return (
    <div>
        <label htmlFor={name} className='text-richblack-5 font-semibold'>
        {label}<sup className='text-pink-200'>*</sup></label>
        <div>
            <input 
            type="text"
            id={name}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            className='text-richblack-5 mt-2 w-full bg-richblack-700 py-2 px-4 rounded-lg border-b-[1px]
           border-richblack-5'
            />
            <button 
            type="button"
            className='font-semibold text-yellow-50 mt-1'
            onClick={handleAddRequirement}>
                Add
            </button>
        </div>
        {
            requirementList.length > 0 && (
                <ul className="mt-2 list-inside list-disc">
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index}  className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button 
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className='ml-2 text-sm text-[#4CFF4C]'>
                                    clear
                                </button>
                            </li>

                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
            <span className="text-pink-200 text-xs">{label} is required**</span>
        )}
    </div>
  )
}

export default RequirementField