import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn  from '../../common/IconBtn'
import {LiaEdit} from "react-icons/lia"

function MyProfile() {
 

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
  return (
    <div className=' flex flex-col gap-10 max-w-[1000px] mx-auto'>
        <h1 className='text-4xl font-semibold mb-[50px] text-richblack-5'>
            My profile
        </h1>
        {/* section 1 */}
        <div className='flex justify-between bg-richblack-800 p-8 rounded-md border-[1px] border-richblack-600'>
            <div className='flex items-center gap-x-8 text-richblack-5'>
                <img src={user?.image}
                 alt={`profile-${user?.firstName}`}
                 className='aspect-square w-[78px] rounded-full object-cover'/>
                <div>
                    <p className='text-lg font-semibold'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-sm font-medium text-richblack-400'>{user?.email}</p>
                </div>
            </div>
            <div>
                <IconBtn text={"Edit"} onClick={() => {navigate("/dashboard/settings")}} type={"button"} bgColor={"yellow-50"}>
                    <LiaEdit />
                </IconBtn>
            </div>
        </div>

        {/* section 2 */}

        <div  className='flex flex-col gap-6 bg-richblack-800 p-8 rounded-md border-[1px] border-richblack-600'>
            <div className='flex justify-between '>
                <p  className='text-lg font-semibold text-richblack-5'>About</p>
                <div>
                    <IconBtn text={"Edit"} onClick={() => {navigate("/dashboard/settings")}} type={"button"} bgColor={"yellow-50"}>
                        <LiaEdit/>
                    </IconBtn>
                </div>
                
            </div>
            <p className='text-sm font-medium text-richblack-400'>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>   
        </div>


        {/* section 3 */}

        <div  className='flex flex-col gap-6 bg-richblack-800 p-8 rounded-md border-[1px] border-richblack-600'>
           <div className='flex justify-between'>
           <p className='text-richblack-5'>Personal Details</p>
           <div>
                <IconBtn text={"Edit"} onClick={() => {navigate("/dashboard/settings")}} type={"button"} bgColor={"yellow-50"}>
                    <LiaEdit/>
                </IconBtn>
            </div>
           </div>
            <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-richblack-400'>First Name</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-richblack-400'>Last Name</p>
                    <p  className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-richblack-400'>Email</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-richblack-400'>Phone Number</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber ?? "Add ContactNumber"}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-richblack-400'>Gender</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                 <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium text-richblack-400'>Date Of Birth</p>
                    <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.dateOfBirth ?? "Add Date Of Birth"}</p>
                </div>
                
            </div>
            
        </div>
    </div>
)
}

export default MyProfile