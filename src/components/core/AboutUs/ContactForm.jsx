import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'


function ContactForm() {

 
  return (
    <div className='lg:w-10/12 mx-auto m-24'>
        <h1 className='text-white text-center text-4xl font-semibold'>Get in Touch</h1>
        <p className='text-richblack-400 text-center py-2 pb-[5%]'>We’d love to here for you, Please fill out this form.</p>
        <ContactUsForm />
    </div>
  )
}

export default ContactForm