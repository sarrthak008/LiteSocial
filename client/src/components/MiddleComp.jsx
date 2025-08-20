import React, { use, useEffect, useState } from 'react'

import Profile from './LeftSideOptions/Profile'
import Peoples from './LeftSideOptions/Peoples'

const MiddleComp = () => {

    
    
    return (
        <div className='w-[100vw] h-[87vh] fixed sm:static sm:w-[55vw]  bg-white rounded-md  shadow-gray-300 shadow-xl   overflow-y-scroll hideScrollbar overflow-x-hidden'>
            {/* <Profile/> */}
            <Peoples/>

        </div>
    )
}

export default MiddleComp