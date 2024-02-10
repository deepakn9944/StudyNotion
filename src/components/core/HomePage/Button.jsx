import React from 'react'
import { Link } from 'react-router-dom'

function Button({children, active, linkto}) {
  return (
    
    <Link to={linkto}>

        <div className={`text-center tex-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
        hover:scale-95 transition-all duration-200`}
        style={{boxShadow:"2px 2px #5c636e"}}
        >
            {children}
        </div>
    </Link>
  )
}

export default Button