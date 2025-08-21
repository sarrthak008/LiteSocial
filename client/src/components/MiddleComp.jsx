import React, { use, useEffect, useState } from 'react'
import { useStore } from '../context/Store'

import Home from './LeftSideOptions/Home'
import Peoples from './LeftSideOptions/Peoples'
import Search from './LeftSideOptions/Search'
import Feed from './LeftSideOptions/Feed'
import Profile from './LeftSideOptions/Profile'
import Settings from './LeftSideOptions/Settings'



const MiddleComp = () => {
   
    const {setMiddleComNum,middleCompNum} = useStore()
    console.log(middleCompNum)
    
    
    return (
        <div className='w-[100vw] h-[87vh] fixed sm:static sm:w-[56vw]  bg-white rounded-md  shadow-gray-300 shadow-xl   overflow-y-scroll hideScrollbar overflow-x-hidden'>
            { 
              middleCompNum == 0 ? <Home /> :
              middleCompNum == 1 ? <Peoples /> :
              middleCompNum == 2 ? <Search /> :
              middleCompNum == 3 ? <Feed /> :
              middleCompNum == 4 ? <Profile /> :
              middleCompNum == 5 ? <Settings /> : null
            }

        </div>
    )
}

export default MiddleComp