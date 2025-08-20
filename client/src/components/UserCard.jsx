import React from 'react'

const UserCard = ({data}) => {
    
  return (
    <div className='h-[150px] bg-gray-300 w-[300px] my-[60px] shrink-0 relative rounded-xl cursor-pointer'>
        <div className='h-[70px] w-[70px] bg-black overflow-hidden rounded-2xl absolute top-[-20%] left-[4%]'>
             <img src={data?.user_info?.userProfile} className='h-[100%] w-[100%] object-cover'/>
        </div>
        <div className='text-center'>
            <h3 className='text-3xl'>{data?.name}</h3>
            <p className='text-xl text-gray-500'>{data?.user_name}</p>
        </div>
        <div>
             {
                data?.user_info?.accountType == "public" ?
                <button className='w-[80%] bg-black py-[4px] text-xl text-white mx-auto block mt-[30px] cursor-pointer'> + follow</button>: 
                <button className='w-[80%] bg-black py-[4px] text-xl text-white mx-auto block mt-[30px] cursor-pointer'> + request</button>

             }
        </div>
        
    </div>
  )
}

export default UserCard