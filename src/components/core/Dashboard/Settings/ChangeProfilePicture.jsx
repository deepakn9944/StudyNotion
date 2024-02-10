import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiUpload } from "react-icons/fi"
import { updateDisplayPicture } from "../../../../services/operations/settingAPI"
import IconBtn from "../../../common/IconBtn"

function ChangeProfilePicture() {
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const[imageFile, setImageFile] = useState(null);
  const[previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);
  const handleClick = () =>{
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const render = new FileReader()
    render.readAsDataURL(file)
    render.onloadend = () => {
      setPreviewSource(render.result)
    }
  }

  const handleFileUpload = () => {
    try{
      console.log("uploading...")
      setLoading(true);
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    }catch(error){
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if(imageFile){
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <div className='flex border-[1px] border-richblack-700 rounded-md bg-richblack-800 py-8 px-8'>
        <div className='flex gap-6 items-center'>
            <img 
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className='aspect-square w-[78px] rounded-full object-cover'/>
            <div className='flex flex-col gap-2'>
                <h1 className='text-richblack-5 text-md'>Change Profile Picture</h1>
                <div className='flex gap-2'>
                    <input type="file" ref={fileInputRef}  onChange={handleFileChange} 
                    className='hidden' accept='image/png, image/gif, image/jpeg'/>
                    <button onClick={handleClick}  disabled={loading}
                    className='bg-richblack-700 px-4 rounded-lg text-richblack-5 text-lg'
                    >Select</button>
                    <IconBtn text={loading ? "Uploading...." : "Upload"}
                    onClick={handleFileUpload} bgColor={"yellow-50"} >
                      {!loading && (
                        <FiUpload />
                      )}
                    </IconBtn>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChangeProfilePicture