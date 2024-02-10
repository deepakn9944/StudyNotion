import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { GiNinjaStar } from 'react-icons/gi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from '../../../../slices/cartSlice'

function RenderCartCourses() {
    const{ cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    console.log(cart);
  return (
    <div className="flex flex-1 flex-col">
        {
            cart.map((course, index) => (
                <div 
                key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 bg-richblack-800 rounded-lg
           border-b border-b-richblack-400 pb-6"
          ${index !== 0 && "mt-6"} `}
          
          >
                        <img src={course?.thumbnail} 
                        alt={course?.courseName}
                        className="h-[148px] w-[220px] rounded-lg  xl:rounded-tr-none xl:rounded-br-none object-cover p-6 xl:p-0 "/>
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row p-6">
                        
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">{course?.courseName}</p>
                            <p className="text-sm text-richblack-300">{course?.category.name}</p>
                        </div>
                        <div className="flex-col items-center gap-2">
                            <div className="flex items-center gap-2">
                            <span className="text-yellow-5">4.8</span>
                            <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<GiNinjaStar />}
                                fullIcon={<GiNinjaStar />}
                            />
                            </div>

                            <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>

                        </div>
                        

                    </div>

                    <div className="flex flex-col items-end space-y-2 p-6">
                        <button
                        className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                        onClick={() => dispatch(removeFromCart(course._id))}>
                            <RiDeleteBin6Line />
                            <spa>Remove</spa>
                        </button>

                        <p className="mb-6 text-3xl font-medium text-yellow-100">
                        ₹ {course?.price}
                        </p>
                    </div>
                </div>
            ))
        }

    </div>
  )
}

export default RenderCartCourses