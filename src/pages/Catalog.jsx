import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentDetails';
import { useSelector } from 'react-redux';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCard from '../components/core/Catalog/Course_Card';




export const Catalog = () => {

  const { loading } = useSelector((state) => state.profile)
  const {catalogName} = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [typeOfCourse, setTypeOfCourse] = useState("most popular");


  //fetch all categories
  useEffect(() => {
    const getCategories = async() => {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]
        ._id;
        setCategoryId(category_id);
        
    }
    getCategories();
  },[catalogName]);

  useEffect(() => {
    const getCategoryDetails = async() => {
        try{
            const res = await getCatalogPageData(categoryId);
            setCatalogPageData(res);

        }catch(error){
            console.log(error)
        }
    }
    if(categoryId){
        getCategoryDetails()
    }
    
  }, [categoryId])
  return (
    <div className='text-richblack-5'>
        
        <div className='bg-richblack-800 py-[75px] pl-16 sm:pl-32 mb-16'>
            <p className='text-richblack-200 text-sm font-medium'>{`Home / Catalog / `}
            <span className='text-yellow-50'>
                {catalogPageData?.data?.selectedCategoryDetails?.name}
                </span></p>
            <p className='text-3xl py-4'>
                {catalogPageData?.data?.selectedCategoryDetails?.name}
                </p>
            <p className='text-richblack-200'>{catalogPageData?.data?.selectedCategoryDetails?.description}</p>
        </div>

        <div>
            {/* section 1 */}
            <div className='w-10/12 mx-auto'>
                <p className='text-4xl font-bold mb-3'>Courses to get you started</p>
                <div className='flex border-b-[1px] border-richblack-500 gap-x-4 mb-4'>
                    <p className={`${typeOfCourse === "most popular" ? 
                    "border-b-2 border-yellow-50  text-yellow-50" : ""} cursor-pointer px-2`}
                    onClick={() => setTypeOfCourse("most popular")}>
                        Most Popular
                    </p>
                    <p className={`${typeOfCourse === "new" ? 
                    "border-b-2 border-yellow-50  text-yellow-50" : ""} cursor-pointer px-2`}
                     onClick={() => setTypeOfCourse("new")}>
                        New
                    </p>
                </div>
                <CourseSlider  Courses={catalogPageData?.data?.selectedCategoryDetails?.courses}/>
            </div>

            {/* section 2 */}

            <div className='w-10/12 mx-auto my-16'>
                <p className='text-4xl font-bold mb-3'>Top courses in {catalogPageData?.data?.selectedCategoryDetails?.name}</p>
                <CourseSlider  Courses={catalogPageData?.data?.categoriesExceptSelected?.courses}/>
            </div>

            {/* section 3 */}

            <div className='w-10/12 mx-auto mb-16'>
                <p className='text-4xl font-bold mb-6'>Frequently Bought</p>
                <div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                        {
                           catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                           .map((course, index)=>(
                            <CourseCard course={course} key={index} Height={"h-[300px]"} />
                           
                           ))
                        }
                    </div>
                </div>
                
            </div>
        </div>
        <Footer/>
    </div>
  )
}
