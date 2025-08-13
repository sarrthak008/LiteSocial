import React from 'react'

const AppButton = ({title="default Button",onclick=()=>{},type="button"}) => {
  return (
    <div className='w-full'>
        <button type='type' className='bg-black text-white cursor-pointer w-full h-[30px] text-2xl capitalize px-[20px]' onClick={()=>onclick()}>{title}</button>
    </div>
  )
}

export default AppButton