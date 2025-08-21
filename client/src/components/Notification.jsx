import React from 'react'

const Notification = () => {
    return (
        <>
            <div className='relative'>
                <i className="ri-notification-fill text-xl"></i>
                <div className='h-[18px] cursor-pointer w-[18px] bg-red-500 rounded-full absolute top-[-20%] right-[-25%] flex items-center text-white justify-center'>
                    10
                </div>
            </div>
        </>
    )
}

export default Notification