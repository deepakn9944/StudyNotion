import copy from 'copy-to-clipboard';
import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { addToCart } from '../../../slices/cartSlice';

function CourseCardDetails({course, setConfirmationModal, handleBuyCourse}) {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail : thumbnailImage,
        price : currentPrice,
    } = course;

    const handleAddToCart = () => {
        console.log(user);
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Your are an instructor, you can't buy a course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"Your are not login",
            text2:"Please login to purchase course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:() => setConfirmationModal(null),
        })


    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }


    return (
    <div className='flex flex-col absolute right-[10%] bg-richblack-700 rounded-lg gap-4 w-[20%]'>
        <img 
        src={thumbnailImage}
        alt="thumbnail"
        className='max-h-[200px] max-w-[400px] rounded-t-lg'
        />
        <div className='text-3xl font-bold px-3'>
            Rs. {currentPrice}
        </div>

        <div className='flex flex-col gap-2 px-3 '>
            <button onClick={user && course?.studentEnrolled.includes(user?._id) ?
            () => navigate("/dashboard/enrolled-courses") : handleBuyCourse }
            className='bg-yellow-50 text-black px-5 py-2 text-xl rounded-lg'>
                {
                    user && course?.studentEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                }
            </button>
            
            {
                (!course?.studentEnrolled.includes(user?._id)) && (<button onClick={handleAddToCart}
                className='px-5 py-2 text-xl rounded-lg bg-richblack-900 '>
                    Add to Cart</button>)
            }
        </div>

        <div >
            <p className='flex items-center justify-center text-richblack-100 text-sm mb-4'>30 days money back guarantee</p>
            <p className='px-3 font-medium'>This Course Includes:</p>
            <div className='px-3'>
                {
                course?.instructions.map((item, index) => (
                    <p key={index} className=' text-caribbeangreen-300 text-sm font-medium'>{item}</p>
                ))
                }
            </div>
        </div>

        <div className='mx-auto my-10 text-yellow-100'>
            <button 
            onClick={handleShare}>
                Share
            </button>
        </div>
    </div>
  )
}

export default CourseCardDetails