import { React, useState} from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { updateProfile } from '../../../../services/operations/settingAPI'
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

function EditProfile() {

  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const{
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm();

  const submitProfileForm = async (data) => {
    try{
      dispatch(updateProfile(token, data))
    }catch(error){
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  return (
    <>
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className='flex flex-col gap-4 border-[1px] border-richblack-700 rounded-md bg-richblack-800 py-10 px-16 w-full'>
        <h2 className='text-richblack-5 text-lg font-semibold'>Profile Information</h2>
        <div className='flex text-richblack-5 justify-between'>
          <div className='flex flex-col w-[48%] gap-3'>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder='Enter first name'
              className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
              {...register("firstName", {required: true})}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
          </div>
          <div className='flex flex-col w-[48%] gap-3' >
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder='Enter last name'
              className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
              {...register("lastName", {required: true})}
              defaultValue={user?.lastName}
            />
            {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
          </div>
        </div>

        <div className='flex text-richblack-5 justify-between'>
          <div className='flex flex-col w-[48%] gap-3'>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
              {...register("dateOfBirth", {
                required: {
                  value: true,
                  message: "Please enter your Date of Birth"
                },
                max: {
                  value: new Date().toISOString().split("T")[0],
                  message: "Date of Birth cannot be in the future."
                },
              })}
              defaultValue={user?.additionalDetails?.dateOfBirth}
              
            />
           {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
          </div>
          <div className='flex flex-col w-[48%] gap-3'>
            <label htmlFor='gender'>Gender</label>
            <select
              type="text"
              name="gender"
              id="gender"
              placeholder='Enter gender'
              className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
              {...register("gender", {required: true})}
              defaultValue={user?.additionalDetails.gender}
            >
              {genders.map((gender, index) => {
                return (
                  <option key={index} value={gender}>{gender}</option>
                )
              })}
            </select>
            {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Gender.
                </span>
              )}
          </div>
        </div>


        <div className='flex text-richblack-5 justify-between'>
          <div className='flex flex-col w-[48%] gap-3'>
              <label htmlFor='contactNumber'>Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder='Enter contact number'
                className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
                {...register("contactNumber", {required: true})}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.firstName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your contact number.
                  </span>
                )}
          </div>
          <div className='flex flex-col w-[48%] gap-3'>
              <label htmlFor='about'>About</label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder='Enter Bio Details'
                className='p-3 bg-richblack-700 border-b-[1px] border-richblack-25 rounded-lg w-[100%]'
                {...register("about", {required: true})}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.firstName && (
                  <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your bio details.
                  </span>
                )}
          </div>
        </div>
      </div>

      <div className='flex justify-end gap-4 mt-[4%]'>
        <button onClick={() => {navigate("/dashboard/my-profile")}}
        className='bg-richblack-700 px-4 rounded-lg text-richblack-5 text-lg'>
          cancel
        </button>
        <IconBtn type="submit" text="Save" bgColor={"yellow-50"}/>
      </div>
    </form>
    </>
  )
}

export default EditProfile