import React from 'react'
import Notification from './Notification'
import RequestCard from './RequestCard'

const RightComp = () => {
  return (
    <div className='w-[23vw] px-[10px] py-[5px] h-screen  ml-4'>
      <div className='w-full h-[40%] py-[4px] bg-white rounded-md shadow-gray-300 shadow-xl p-2 overflow-y-scroll overflow-x-hidden hideScrollbar'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl'>Requests</h2>
        </div>
        <div className='notification-container overflow-x-hidden '>
             <RequestCard/>
             <RequestCard/>
             <RequestCard/>
        </div>
      </div>

      <div className='w-full h-[50%]  bg-white rounded-md shadow-gray-300 shadow-xl mt-4'>

      </div>

    </div>
  )
}

export default RightComp