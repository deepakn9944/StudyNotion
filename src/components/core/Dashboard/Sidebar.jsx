import React, { useState } from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import { logout } from '../../../services/operations/authAPI'
import SidebarLink from "./SidebarLink"
import { VscSignOut } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from "../../common/ConfirmationModal"

function Sidebar() {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading: authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[confirmationModal, setConfirmationModal] = useState(null);
    if(profileLoading || authLoading){
        return (
            <div className='mt-10 text-white text-4xl'>
                 Loading...
            </div>
        )
    }
  return (
   <div className='w-[15%]'>
        <div className='bg-richblack-800 h-full text-richblack-100 py-8 font-semibold'>
            <div className='felx flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })}
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] bg-richblack-600'></div>

            <div>
                <SidebarLink 
                 link={{ name: "Settings", path: "/dashboard/settings" }}
                iconName="VscSettingsGear" />
            </div>

            <button onClick={ () => setConfirmationModal({
                text1:"Are you sure?",
                text2:"You will be logged out of your account.",
                btn1Text:"Logout",
                btn2Text:"Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),

            })}>
                <div className='flex items-center px-4 gap-3 text-sm font-normal py-2'>
                    <VscSignOut className='text-lg'/>
                    <span>Logout</span>
                </div>
            </button>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} /> }
   </div>
  )
}

export default Sidebar