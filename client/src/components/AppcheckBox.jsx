import React, { useState } from 'react'


const AppcheckBox = ({title="default value",checkVal,setCheckVal}) => {

   

  return (
    <span className='flex items-center gap-[15px] cursor-pointer'>
        <input type='checkbox' id={title} className='h-[15px] w-[15px] cursor-pointer' onChange={(e)=>{setCheckVal(e.target.checked)}} />
        <label htmlFor={title} className='text-gray-600 cursor-pointer' >{title}</label>
    </span>
  )
}

export default AppcheckBox  