import React from 'react'
import { useStore } from '../context/Store'

const RequestCard = () => {
 
   let {loadUserAllInfo} =  useStore()
   console.log(loadUserAllInfo())

  return (
    <div className='w-full h-[120px] bg-gray-300 rounded-md  my-[20px] shadow-gray-400'>
       <div className='w-full h-[50%] flex items-center p-[5px]'>
           <div className='h-[53px] w-[53px] bg-black rounded-md overflow-hidden'>
              <img src='' alt='user-img-liteSocial' className='h-full w-full object-cover'></img>
           </div>
       </div>
    </div>
  )
}

export default RequestCard