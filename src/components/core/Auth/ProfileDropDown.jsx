import React, { useState } from 'react'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../../services/operations/authAPI"

function ProfileDropDown() {
  const {user} = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <button className='relative' onClick={() => setOpen((prev) => !prev)}>
      <div className='flex items-center gap-x-1'>
        <img 
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
          />
         <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div onClick={(e) => {e.stopPropagation(); setOpen((prev) => !prev)}} className='z-[1000] flex flex-col bg-richblack-800 rounded-lg absolute  right-[1%] mt-2 border-[1px] border-richblack-400 group'>
          <Link to="/dashboard/my-profile" >
            <div className='flex gap-3 text-richblack-100 items-center px-2 py-2 border-b-[1px]  border-richblack-400 group-hover:bg-richblack-700 group-hover:text-richblack-25'>
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          
           <button onClick={() => {
            dispatch(logout(navigate) )
            }}
            className='z-100 flex text-richblack-100 gap-3 px-2 py-2 items-center hover:bg-richblack-700 hover:text-richblack-25'
            >
            <VscSignOut className="text-lg"/>
            <h1 className='hover:bg-richblack-700 hover:text-richblack-25'>Logout</h1>
          </button>
          
        </div>
      )}
    </button>
  )
}

export default ProfileDropDown

