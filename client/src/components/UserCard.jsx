import React, { useState } from 'react'
import { useStore } from '../context/Store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const DBURL = import.meta.env.VITE_SERVER_URI

const UserCard = ({ data }) => {

  const { loadProfile } = useStore()
  const userInfo = loadProfile()
  const [currUser, setCurUser] = useState(userInfo)

  const naviaget = useNavigate()


  const openUserProfile = (id) => {
    naviaget(`/${id}`)
  }

  // handel the request

  const handelRequest = async (e, operation, id) => {
    e.stopPropagation()
    toast.loading("sending request...")
    try {
      let reponse = await axios(`${DBURL}/request/${id}`,{withCredentials:true})
      if (reponse.data.success) {
        toast.dismiss()
        toast.success(reponse.data.message)
      } else {
        toast.dismiss()
        toast.error(reponse.data.message)
      }

    } catch (error) {
      toast.dismiss()
      console.log(res)
      toast.error(error?.responce?.data?.message)
    }
  }


  return (<>
    {
      currUser?.username === data?.user_name ?

        <div className='h-[150px] bg-black w-[300px] my-[50px] shrink-0 relative rounded-xl cursor-pointer order-[-1]'>
          <div className='h-[70px] w-[70px] bg-black overflow-hidden rounded-2xl absolute top-[-20%] left-[4%]'>
            <img src={data?.user_info?.userProfile} className='h-[100%] w-[100%] object-cover' />
          </div>
          <div className='text-center'>
            <h3 className='text-3xl text-white'>{data?.name}</h3>
            <p className='text-xl text-gray-500'>{data?.user_name}</p>
          </div>
          <div>

            <button className='w-[80%] bg-white py-[4px] text-xl text-black mx-auto block mt-[30px] cursor-pointer'> <i className="ri-user-5-fill"></i> my profile</button>
          </div>
          <i className="ri-pushpin-fill text-red-600 text-2xl absolute top-[-8%] right-[-3%] "></i>
        </div>

        : <div className='h-[150px] bg-gray-300 w-[300px] my-[50px] shrink-0 relative rounded-xl cursor-pointer shadow-md shadow-gray-400 ' onClick={() => { openUserProfile(data?._id) }}>
          <div className='h-[70px] w-[70px] bg-black overflow-hidden rounded-2xl absolute top-[-20%] left-[4%]'>
            <img src={data?.user_info?.userProfile} className='h-[100%] w-[100%] object-cover' />
          </div>
          <div className='text-center'>
            <h3 className='text-3xl'>{data?.name}</h3>
            <p className='text-xl text-gray-500'>{data?.user_name}</p>
          </div>
          <div>
            {
              data?.user_info?.accountType == "public" ?
                <button className='w-[80%] bg-black py-[4px] text-xl text-white mx-auto block mt-[30px] cursor-pointer' onClick={(e) => handelRequest(e, 'follow', data?._id)}> <i className="ri-heart-add-fill"></i> follow</button> :
                <button className='w-[80%] bg-black py-[4px] text-xl text-white mx-auto block mt-[30px] cursor-pointer' onClick={(e) => handelRequest(e, 'request', data?._id)}> <i className="ri-notification-fill"></i> request</button>

            }
          </div>

        </div>
    }
  </>
  )
}

export default UserCard