import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

function Settings() {
  return (
    <div className='flex flex-col gap-12'>
        <h1 className='text-3xl text-richblack-5 font-semibold'>Edit profile</h1>
        {/* change profile pic */}
        <ChangeProfilePicture />
        {/* edit details */}
        <EditProfile />
        {/* change password */}
        <UpdatePassword />
        {/* delete account */}
        <DeleteAccount />
    </div>
  )
}

export default Settings