import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const DBURL = import.meta.env.VITE_SERVER_URI
import AppButton from '../components/AppButton'
import toast from 'react-hot-toast'
import { useStore } from '../context/Store'

const UserProfile = () => {

    let {id} = useParams()
    const [userInfo,setUserInfo] = useState()


    let {loadUserAllInfo,isalredyFollow} =  useStore()
    const [loginUserInfo ,setLoginUserInfo] = useState(loadUserAllInfo() || "")


    let loadUser = async ()=>{
         toast.loading("loading user profile...")
         try {
            let response  = await axios.get(`${DBURL}/getuser/${id}`)
            if(response.data.success){
                setUserInfo(response.data.data)
                toast.dismiss()
                toast.success("user profile loaded")
            }else{
                toast.dismiss()
                toast.error(response.data.message)
            }

         } catch (error) {
            toast.dismiss()
            toast.error(error?.responce?.data?.message)
         }
    }


    useEffect(()=>{ 
         loadUser()
    },[])

  return (
     <>
            <div className='px-[20px] py-[10px] relative'>
                <h2 className='text-xl flex items-center cursor-pointer mb-[20px]'>{userInfo?.name}<i className="ri-arrow-down-wide-line"></i></h2>

                <div className='w-full min-h-[150px] flex gap-[10px] flex-wrap'>

                    <div className='h-[90px] w-[90px] bg-red-200 rounded-md overflow-hidden block cursor-pointer'>
                            <img src={userInfo?.user_info?.userProfile} className='h-full w-full object-cover' />
                        <h4 className='text-xl'>{userInfo?.user_name}</h4>
                        <p className='text-xl text-gray-400'>{userInfo?.email}</p>
                    </div>

                    <div className='flex flex-col items-start justify-start'>
                        <div className='flex gap-[20px]'>
                            <p className='text-2xl cursor-pointer whitespace-nowrap'>{userInfo?.posts?.length} <span className='text-base sm:text-xl text-gray-600'>Posts</span></p>
                            <p className='text-2xl cursor-pointer whitespace-nowrap'>{userInfo?.followers?.length} <span className='text-base sm:text-xl text-gray-600'>Followers</span></p>
                            <p className='text-2xl cursor-pointer whitespace-nowrap'>{userInfo?.following?.length} <span className='text-base sm:text-xl  text-gray-600'>Following</span></p>
                        </div>
                        {
                            userInfo?.user_info?.location ?
                                <div className='mt-[1px] flex gap-[10px] items-center text-xl'>
                                    <span className='flex items-center gap-[10px]'><i className="ri-map-pin-fill text-gray-600 text-sm"></i>{userInfo?.user_info?.location}</span>
                                </div> : <h1>not reveled</h1>
                        }
                        <div className='text-xl mt-[1px]'><i className="ri-quill-pen-ai-fill text-sm text-gray-600"></i> {userInfo?.user_info?.bio}</div>
                    </div>
                </div>

            </div>

            <div className=' w-[80vw]  sm:w-[40vw] md:w-[20vw] ml-[20px]'>
            
                 {
                    isalredyFollow(userInfo?._id) ? 
                    <AppButton title='unfollow'/> : 
                      userInfo?.user_info?.accountType == "public" ?
                      <AppButton title='follow'/> : 
                      <AppButton title='request'/>
                 }
                
            </div>



            <div className=' pb-[10%] w-full  mt-[20px]'>
                <i className='ri-calendar-2-line text-2xl ml-[30px] mt-[30px]'></i>
                <div className='w-[100%] min-h-[400px] flex flex-wrap  items-center sm:px-[20px] justify-center sm:justify-start'>
                    {
                        userInfo?.posts?.map((postInfo, index) => {
                            return (
                                <div  key={index} className=' w-[250px] h-[240px] sm:h-[350px] sm:w-[300px] m-[4px] overflow-hidden border-[0.1px] cursor-pointer    bg-red-100 shrink-0 border-gray-600'>
                                    <img src={postInfo.image} className='h-full w-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

           

        </>
  )
}

export default UserProfile