import React, { use, useEffect, useState } from 'react'

import Profile from './LeftSideOptions/Profile'

const MiddleComp = () => {

    


    return (
        <div className='w-[100vw] fixed sm:static sm:w-[55vw]  bg-white rounded-md  shadow-gray-300 shadow-xl  h-screen  overflow-y-scroll hideScrollbar overflow-x-hidden'>
            <Profile/>

        </div>
    )
}

export default MiddleComp