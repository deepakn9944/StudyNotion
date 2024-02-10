import React from 'react'
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Company = ["About", "Careers", "Affilliates"]
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

export default function Footer() {
  return (
    <div className='flex flex-col bg-richblack-800'>
        <div className='w-10/12 mx-auto flex lg:flex-row flex-col mt-16'>
            <div className='grid lg:grid-cols-3 min-[400px]:grid-cols-2 gap-6 mr-6 mb-7 '>
                <div >
                    <div className='pb-3'>
                        <img src={Logo} alt="logo" className='object-contain' />
                    </div>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-richblack-5'>Company</h1>
                        <ul className='flex flex-col gap-2'>
                            {Company.map((ele, index) => (
                                <li key={index} className='text-richblack-300 text-sm hover:text-richblack-50'>
                                    <Link  to={ele.toLowerCase()}>{ele}</Link></li>
                            ))

                            }
                        </ul>
                    </div>
                    <div className='flex text-richblack-400 pt-3 gap-4 text-lg'>
                        <FaFacebook/>
                        <FaGoogle/>
                        <FaTwitter/>
                        <FaYoutube/>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='text-richblack-5 pb-3'>Resources</h1>
                        <ul className='flex flex-col gap-3'>
                            {Resources.map((ele, i) => (
                                <li key={i} className='text-richblack-400 text-sm hover:text-richblack-50'>
                                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link></li>
                            ))

                            }
                        </ul>
                    </div>
                    <div>
                    <h1 className='text-richblack-5 pb-3 pt-10'>Support</h1>
                    <div className='text-richblack-400 text-sm hover:text-richblack-50'>
                        <Link to={'support'}>Support</Link></div>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='text-richblack-5 pb-3'>Plans</h1>
                        <ul className='flex flex-col gap-3'>
                            {Plans.map((ele, i) => (
                                <li key={i} className='text-richblack-400 text-sm hover:text-richblack-50'>
                                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link></li>
                            ))

                            }
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-richblack-5 pb-3 pt-10'>Community</h1>
                        <ul className='flex flex-col gap-3'>
                            {Community.map((ele, i) => (
                                <li key={i} className='text-richblack-400 text-sm hover:text-richblack-50'>
                                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link></li>
                            ))

                            }
                        </ul>
                    </div>
                </div>

            </div>
            <div className='border-l-[1px] border-richblack-700'></div>

            <div className='grid lg:grid-cols-3 min-[400px]:grid-cols-2 gap-12 lg:ml-6 '>
                {FooterLink2.map((list, i) => (
                    <div>
                        <h1 className='text-richblack-5 pb-3'>{list.title}</h1>
                        <ul className='text-richblack-400 text-sm flex flex-col gap-3'>
                            {list.links.map((item, iindex) => (
                                <li className='hover:text-richblack-50'>
                                    <Link to={item.link}>{item.title}</Link></li>
                            ))
                            }
                        </ul>
                    </div>
                    
                ))
                    
                }
            </div>
        </div>

        <div className='border-b-[1px] w-10/12 mx-auto mt-7 border-richblack-700'></div>
        <div className='w-10/12 mx-auto my-14 flex lg:flex-row flex-col lg:justify-between items-center'>
            <div className='flex'>
                {BottomFooter.map((ele, i) => (
                    <div className={`${(i !== 0 && i < BottomFooter.length && "border-l-[1px] border-richblack-700")
                    } text-richblack-400 text-sm px-2`}>{ele}</div>
                ))
                }
            </div>
            <div className='text-richblack-400 text-center text-sm mt-5 lg:mt-0'>Made with ❤️ CodeHelp © 2023 Studynotion</div>

        </div>

    </div>
  )
}
