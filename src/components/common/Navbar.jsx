import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle, IoIosArrowDropup} from 'react-icons/io'

const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-dev"

    }
]


function Navbar() {
 

    const {token} = useSelector ((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing SubLinks", result.data.data)
            setSubLinks(result?.data.data);

        }catch(error){
            console.log("Could not fetch the category list");

        }
    }

    useEffect(() => {
       fetchSubLinks();
    }, [])
    const matchRoute = (route) => {
        console.log("location route", route);
        return matchPath({path:route}, location.pathname);
        
    }
    console.log("location", location.pathname);
  return (
    <div className='h-14 flex items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className=" flex w-11/12 max-w-maxContent items-center justify-between">
            {/* image */}

            <Link to='/'>
                <img src={logo}  alt="logo.png" width={160} height={42} loading='lazy'/>
            </Link>

            {/* nav links */}

            <nav>
                <ul className='flex gap-x-6 text-richblack-25 z-0'>
                    {
                        NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                    <div
                                    className={`group relative flex cursor-pointer items-center gap-2 ${
                                        matchRoute("/catalog/:catalogName")
                                          ? "text-yellow-25"
                                          : "text-richblack-25"
                                      }`}>
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle />

                                        <div className='invisible absolute left-[50%] top-[50%] -translate-x-[50%] translate-y-[20%]
                                        flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 
                                        opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100
                                        lg:w-[300px] z-10'>
                                            <div className='absolute left-[57%] -top-2 h-6 w-6 rotate-45 rounded bg-richblack-5'></div>
                                            {
                                                subLinks.length ? (
                                                        subLinks.map((subLink, index) => (
                                                            <Link to={`/catalog/${
                                                                subLink.name.split(" ").join("-").toLowerCase()
                                                            }`} key={index}>
                                                                <p className='px-4 py-4 text-md hover:bg-richblack-50 rounded-2xl text-[1rem]' >{subLink.name}</p>
                                                            </Link>   
                                                        ))
                                                ):(<div className='absolute left-[57%] -top-2 h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                    No category Present
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                    ) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                            {link.title}
                                        </p>
                                        

                                    </Link>)
                                }
                            </li>
                        ))
                    }

                </ul>
            </nav>


            {/* login/Signup/dashboard */}
            <div className='flex gap-x-4 items-center'>
                {/* {
                    user && user?.accountType !==  "Instructor" && (
                        <Link to="/dashboard/cart" className='rlative'>
                            <AiOutlineShoppingCart />
                            {
                                 totalItems > 0 && (<span>{totalItems}</span>)
                            }
                        </Link>
                    )
                } */}
                {
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                Sign up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }

            </div>


        </div>
    </div>
  )
}

export default Navbar