import React from 'react'

const AppTextArea = ({label="default",value,onchange=()=>{},placeholder="Litesocial"}) => {
  return (
    <div className='w-full'>
        <label className='text-2xl '>{label}</label>
        <br></br>
        <textarea required  placeholder={placeholder} className='border-[1px]  border-black text-xl py-2 px-[5px] block  outline-none w-full h-[70px] resize-none' value={value} onChange={(e)=>{onchange(e)}}/>
    </div>
  )
}

export default AppTextArea