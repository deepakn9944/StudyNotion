import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../services/apiconnector"
import { contactusEndpoint } from '../../services/apis';
import countrycode from "../../data/countrycode.json"

function ContactUsForm() {

  const [loading, setLoading] = useState(false);
  const{
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful}
  } = useForm();


  const submitContactForm = async(data) => {
    console.log("Logging Data", data);
    try{
        setLoading(true);
        //const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
        const response = {status:"OK"}
        console.log("Logging response", response);
        
        setLoading(false);
    }catch(error){
        console.log("error", error.message);
        setLoading(false);
    }

  }


  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        message:"",
        countryCode:"",
        phoneNo:""
      })
    }
  }, [reset, isSubmitSuccessful])


  return (
   <form onSubmit={handleSubmit(submitContactForm)}
    className='flex flex-col w-10/12 min-w-[300px] sm:min-w-[400px] mx-auto gap-5'>
    <div className='flex flex-col lg:flex-row justify-between'>
        {/* firstname */}
        <div className='flex flex-col gap-1'>
            <label className='text-richblack-500' htmlFor="firstname">First Name</label>
            <input 
                type="text"
                name="firstname"
                id="firstname"
                placeholder='Enter First Name'
                {...register("lastname", {required:true})}
                className='bg-richblack-800 py-3 px-4 rounded-xl'
            />
            {
                errors.firstname && (
                    <span>
                        Please Enter Your Name
                    </span>
                )
            }
        </div>

        {/* lastname */}

        <div className='flex flex-col gap-1'>
            <label className='text-richblack-500' htmlFor="lastname">Last Name</label>
            <input 
                type="text"
                name="lastname"
                id="lastname"
                placeholder='Enter Last Name'
                {...register("lastname")}
                className='bg-richblack-800 py-3 px-4 rounded-xl'
            />
        </div>
    </div>

    {/* email */}
    <div className='flex flex-col gap-1'>
            <label className='text-richblack-500' htmlFor="email">Email Address</label>
            <input 
                type="text"
                name="email"
                id="email"
                placeholder='Enter your Email'
                {...register("email", {required:true})}
                className='bg-richblack-800 py-3 px-4 rounded-xl'
            />
            {
                errors.email && (
                    <span>
                        Please Enter Your Email
                    </span>
                )
            }
        </div>

        {/* phone no */}
        <div className='flex flex-col gap-1'>
            <label className='text-richblack-500' htmlFor="phoneNo">Phone Number</label>
            <div className='flex justify-between'>
                <select name="dropdown" id="dropdown" {...register("countryCode", {required:true})}
                className='bg-richblack-800 py-3 px-2 rounded-lg text-richblack-5 overflow-x-hidden w-[calc(100%-85%)]'>
                    {
                        countrycode.map((element, index) => (<option value={element.code} key={index}
                        className='px-2'>
                            {element.code} - {element.country}
                        </option>))

                    }
                </select>
                <input 
                    type="tel"
                    name="phoneNo"
                    id="phoneNo"
                    placeholder='12345 67890'
                    {...register("phoneNo", {required:{value:true, message:"Please enter phone number"}, maxLength: {value:14, message:"Invalid Phone Number"}
                    , minLength: {value:4, message:"Invalid Phone Number"}})}
                    className='bg-richblack-800 py-3 px-4 rounded-xl w-[calc(100%-20%)]'
                />
            </div>
            
            {
                errors.phoneNo && (
                    <span>
                        Please Enter Your Phone Number
                    </span>
                )
            }
        </div>

        {/* message */}
        <div className='flex flex-col gap-1'>
            <label className='text-richblack-500' htmlFor="message">Message</label>
            <textarea 
                name="message"
                id="message"
                cols="30"
                rows="7"
                placeholder='Enter your message here...'
                {...register("message", {required:true})}
                className='bg-richblack-800 py-3 px-4 rounded-xl'
            />
            {
                errors.message && (
                    <span>
                        Please Enter Your Message
                    </span>
                )
            }
        </div>
        <button type="submit" className={`text-center tex-[13px] px-6 py-3 rounded-md font-bold bg-yellow-50 text-black
        hover:scale-95 transition-all duration-200`}
        style={{boxShadow:"2px 2px #5c636e"}}>
            Send Message
        </button>


   </form>
  )
}

export default ContactUsForm