import React, { useEffect, useState } from 'react'
import {apiConnector} from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import 'swiper/css/navigation';
import "swiper/css/pagination"
import {Autoplay, Pagination, Navigation, FreeMode} from 'swiper/modules'
import ReactStars from 'react-stars';
import { FaStar } from 'react-icons/fa';

const {REVIEWS_DETAILS_API} = ratingsEndpoints;
function ReviewSlider() {

    
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET" , REVIEWS_DETAILS_API);
            console.log(data);
            if(data?.success){
                console.log("hi")
                setReviews(() => data?.data);
            }
            
        }
    
        
        fetchAllReviews();
    }, [])

    console.log("data",reviews);
    
  return (
    <div>
        <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
            <Swiper 
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay: 2500
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-full'>
                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index} className='bg-richblack-800 p-4 h-[184px] text-[14px] rounded-lg'>
                            <div className='flex gap-3 items-center pb-2'>
                                <img 
                                src={review?.user?.image 
                                    ? review?.user?.image 
                                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                alt='Profile Pic'
                                className='h-9 w-9 object-cover rounded-full'/>
                                <div>
                                    <p className='text-white'>{review?.user?.firstName} {review?.user?.lastName}</p>
                                    <p className='text-sm text-richblack-600'>{review?.user?.email}</p>
                                </div>
                            </div>
                            <p className="font-medium text-richblack-25">
                            {review?.review.split(" ").length > truncateWords
                            ? `${review?.review
                                .split(" ")
                                .slice(0, truncateWords)
                                .join(" ")} ...`
                            : `${review?.review}`}
                            </p>
                            <div className='flex gap-2 items-center'>
                                <p className='text-yellow-100'>{review?.rating.toFixed(1)}</p>
                                <ReactStars 
                                count={5}
                                value={review?.rating}
                                size={20}
                                edit={false}
                                activeColor="ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>

    </div>
  )
}

export default ReviewSlider