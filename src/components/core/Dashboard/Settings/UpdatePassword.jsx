import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/settingAPI"
import IconBtn from "../../../common/IconBtn"

function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async(data) => {
    try{
      await changePassword(token, data)
    }catch(error){
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
      <form>
        <div className='flex flex-col gap-4 border-[1px] border-richblack-700 rounded-md bg-richblack-800 py-10 px-16 w-full'>
          <h2 className='text-richblack-5 text-lg font-semibold'>Password</h2>
          <div className='flex text-richblack-5 justify-between'>
            <div className='flex flex-col w-[48%] gap-3 relative'>
              <label htmlFor="oldPassword">Current Password</label>
              <input 
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
                {...register("oldPassword", {required: true})}
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="right-3 top-[48px] z-[10] cursor-pointer absolute"
              >
              {
                showOldPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ):(
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )
              }
              </span>
              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}
            </div>

            <div className='flex flex-col w-[48%] gap-3 relative'>
              <label htmlFor="newPassword">New Password</label>
                <input 
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter New Password"
                  className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
                  {...register("newPassword", {required: true})}
                />
                <span
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-[48px] z-[10] cursor-pointer"
                >
                {
                  showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ):(
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )
                }
                </span>
                {errors.oldPassword && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your New Password.
                  </span>
                )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-[4%]">
        <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" bgColor="yellow-50"/>
        </div>
      </form>

    </>
  )
}

export default UpdatePassword