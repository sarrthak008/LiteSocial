import React, { useState, useEffect } from 'react'
import { useStore } from '../context/Store'
import { LEFT_SIDE_OPTIONS } from '../utils/Data'

const LeftComp = () => {

    let { loadProfile } = useStore()
    const [userInfo, setuserInfo] = useState()

    useEffect(() => {
        setuserInfo(loadProfile())
    }, [])




    return (
        <div className='w-[20vw] px-[10px] py-[5px] h-screen'>
            <div className='hidden  sm:flex h-[70px] w-[100%] bg-white rounded-md shadow-gray-300 shadow-xl  items-center px-[10px]'>
                <div className='h-[45px] w-[45px] overflow-hidden rounded-xl'>
                    <img src={userInfo?.info?.userProfile} className='h-full w-full object-cover'></img>
                </div>
                <div className=' ml-[10px] overflow-hidden gap-0'>
                    <h4 className='font-medium text-xl'>{userInfo?.name}</h4>
                    <p className='text-gray-600'>@{userInfo?.username}</p>
                </div>
            </div>

            {/* render on large screen */}

            <div className='hidden sm:flex h-[45vh] w-[100%] px-[2.5%]  flex-col justify-evenly bg-white rounded-md shadow-gray-300 shadow-xl mt-[20px]'>
                {
                    LEFT_SIDE_OPTIONS?.map((option, index) => {
                        return (
                            <div className='flex border-b-2 gap-[9px] cursor-pointer border-b-gray-300' key={index}>
                                <div className='text-gray-400'><i className={option.icon}></i></div>
                                <div className='text-xl'>{option.name}</div>
                            </div>
                        )
                    })
                }

            </div>

            {/* render on small screee */}


            {
                <div className='fixed z-[1000] justify-between px-[8px] items-center bottom-0 bg-white h-12 w-full left-0 sm:hidden flex'>
                    {
                        LEFT_SIDE_OPTIONS?.map((option, index) => {
                            return (
                                <div className='flex  gap-[10px] cursor-pointer' key={index}>
                                    <div className='text-black text-xl decoration-none'><i className={option.icon}></i></div>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default LeftComp