import React from 'react'

const AppButton = ({title="default Button"}) => {
  return (
    <div className='w-full'>
        <button className='bg-black text-white cursor-pointer w-full h-[40px] text-2xl capitalize'>{title}</button>
    </div>
  )
}

export default AppButton