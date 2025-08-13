import React, { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DB_URL = import.meta.env.VITE_SERVER_URI

import Navbar from '../components/Navbar'
import LeftComp from '../components/LeftComp'
import MiddleComp from '../components/MiddleComp'

const Dasboard = () => {

    const navigator = useNavigate()

    const loadDashBoard = async () => {
        try {
            let responce = await axios.get(`${DB_URL}/mydashboard`, { withCredentials: true })

            if(responce.data.success){
              toast.success(`hey welcome ${responce.data.data.name}`)
              localStorage.setItem("user_info",JSON.stringify(responce.data.data))
            }

        } catch (error) {
            toast.error(error.response.data.message)
            localStorage.removeItem("user_info")
            navigator("/")
        }
    }


    useEffect(() => {
        loadDashBoard()
    }, [])

    return (
        <div className='h-screen w-screen overflow-hidden'>
             <Navbar/>
             <div className='h-full w-screen bg-gray-200 py-[20px] flex'>
                <LeftComp/>
                <MiddleComp/>
             </div>
        </div>
    )
}

export default Dasboard