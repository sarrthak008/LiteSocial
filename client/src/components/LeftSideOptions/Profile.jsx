import React, { use, useEffect, useState } from 'react'

import { useStore } from '../../context/Store'
import AppButton from '../AppButton'

const Profile = () => {

    const [userInfo, setUserInfo] = useState()
    let { loadUserAllInfo } = useStore()

    useEffect(() => {
        setUserInfo(loadUserAllInfo())
    }, [])

    return (
        <>
            <div className='px-[20px] py-[10px] relative'>
                <h2 className='text-xl flex items-center cursor-pointer'>{userInfo?.name}<i className="ri-arrow-down-wide-line"></i></h2>
                <div className='w-full min-h-[150px] flex gap-[20px] flex-wrap'>
                    <div>
                        <div className='h-[100px] w-[100px] bg-red-200 rounded-md overflow-hidden'>
                            <img src={userInfo?.user_info?.userProfile} className='h-full w-full object-cover' />
                        </div>
                        <h4 className='text-xl'>{userInfo?.user_name}</h4>
                        <p className='text-xl text-gray-400'>{userInfo?.email}</p>
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex gap-[20px]'>
                            <p className='text-2xl cursor-pointer'>{userInfo?.posts?.length} <span className='text-md text-gray-600'>Posts</span></p>
                            <p className='text-2xl cursor-pointer'>{userInfo?.followers?.length} <span className='text-md text-gray-600'>Followers</span></p>
                            <p className='text-2xl cursor-pointer'>{userInfo?.following?.length} <span className='text-md text-gray-600'>Following</span></p>
                        </div>
                        {
                            userInfo?.user_info?.location ?
                                <div className='mt-[20px] flex gap-[10px] items-center text-2xl'>
                                    <span className='flex items-center gap-[10px]'><i className="ri-map-pin-fill text-gray-600 text-xl"></i>{userInfo?.user_info?.location}</span>
                                </div> : null

                        }
                        <div className='text-2xl mt-[20px]'>{userInfo?.user_info?.bio}</div>
                    </div>
                </div>
            </div>
            <div className=' w-[50vw] sm:w-[20vw] ml-[3px]'>
                <AppButton title='edit profile' />
            </div>
            <div className=' pb-[10%] w-full  mt-[20px]'>
                <i className='ri-calendar-2-line text-2xl ml-[30px] mt-[30px]'></i>
                <div className='w-[100%] min-h-[400px] flex flex-wrap  items-center sm:px-[20px] justify-center sm:justify-start'>
                    {
                        userInfo?.posts?.map((postInfo, index) => {
                            return (
                                <div className=' w-[250px] h-[240px] sm:h-[350px] sm:w-[300px] m-[4px] overflow-hidden border-[0.1px] cursor-pointer    bg-red-100 shrink-0 border-gray-600'>
                                    <img src={postInfo.image} className='h-full w-full object-cover'/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Profile