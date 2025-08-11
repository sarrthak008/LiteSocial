import React, { useEffect ,useState} from 'react'
import { BRAND_NAME } from '../utils/Data'
import AppButton from './AppButton'
import { useStore } from '../context/Store'


const Navbar = () => {

    let {loadProfile} = useStore()
    const [userInfo , setUserInfo] = useState([])

    useEffect(()=>{
        setUserInfo(loadProfile())
    },[])


  return (
    <div className='border-b-1 border-b-black h-12 w-[100vw] px-[3px] sm:px-[20px] flex items-center justify-between'>
       <div className='text-2xl font-medium'>{BRAND_NAME}</div>
      
           <div className='flex items-center gap-[20px]'>
              <AppButton title="+ create"/>

              <div className='h-[40px] w-[40px] bg-black rounded-full shrink-0 overflow-hidden border-1 border-black'>
                 <img src={userInfo?.info?.userProfile}/>
              </div>
           </div>
    </div>
  )
}

export default Navbar