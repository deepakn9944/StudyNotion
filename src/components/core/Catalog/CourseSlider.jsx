import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import 'swiper/css/navigation';
import "swiper/css/pagination"
import {Autoplay, Pagination, Navigation} from 'swiper/modules'
import CourseCard from "./Course_Card"


const CourseSlider = ({Courses}) => {
  return (
    <div>
        {
            Courses?.length ? (
                <Swiper 
                slidesPerView={1}  
                spaceBetween={20}
                autoplay={{
                    delay: 250,
                    disableOnInteraction: false,
                  }} 
                
                pagination={true} 
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                    480:{slidesPerView: 2},
                    1024:{slidesPerView: 3}
                }}
               
                >
                    {
                        Courses?.map((course, index) => (
                            <SwiperSlide key={index}>
                                <CourseCard course={course} Height={"h-[200px]"} />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            ):(
                <div>No course Found</div>
            )

        }
    </div>
  )
}

export default CourseSlider