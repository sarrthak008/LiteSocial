import React from 'react'

const AppInput = ({label,type,value,onchange}) => {
  return (
    <div className='w-full'>
        <label className='text-2xl '>{label}</label>
        <br></br>
        <input type={type} className='border-[1px]  border-black text-2xl py-2 px-10 block h-[50px] outline-none w-full' value={value} onChange={(e)=>{onchange(e)}}/>
    </div>
  )
}

export default AppInput