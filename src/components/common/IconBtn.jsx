import React from 'react'

function IconBtn({text, onClick, children, bgColor, type, customClasses}) {
  return (
    <button  onClick={onClick} type={type} className={`${!customClasses ? `font-semibold text-md text-[black] bg-${bgColor} flex items-center gap-x-2 px-5 py-2 rounded-md` : customClasses} `}>
        {
            children ? (
            <>
               <span >{text}</span>
               {children}
            </>
            ) : (text)
        }
    </button>
  )
}

export default IconBtn