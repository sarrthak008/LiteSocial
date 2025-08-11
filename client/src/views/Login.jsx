import React, { useEffect, useState } from 'react'
import LOGIN_IMG from "../images/login.jpeg"
import AppInput from '../components/AppInput'
import AppcheckBox from '../components/AppcheckBox'
import AppButton from '../components/AppButton'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const DBURL = import.meta.env.VITE_SERVER_URI


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passType, setPassType] = useState("password")
    const [checkVal, setCheckVal] = useState(false)
    const naviagtor = useNavigate()


const handelLogin = async () => {

        let tid = toast.loading("try to login...")
        try {
            if (email == "" || password == "") {
                toast.dismiss(tid)
                return toast.error("all filds are required")
            }
            let response = await axios.post(`${DBURL}/login`, { email, password }, { withCredentials: true })
            if (response.data.success) {
                toast.dismiss(tid)
                toast.success(response.data.message)
                localStorage.setItem("user",JSON.stringify(response.data.data))
                 naviagtor("/dashboard")
            }
        } catch (error) {
            toast.dismiss(tid)
            toast.error(error.response.data.message)
        }
    }





    useEffect(() => {
        if (checkVal) {
            setPassType("text")
        }
        else {
            setPassType("password")
        }
    }, [checkVal])

    return (
        <div className='h-screen w-screen overflow-hidden flex'>
            <div className='w-[100%] sm:w-[65%] h-full flex flex-col items-center'>

                <h2 className='text-[5em] font-bold text-center'>Login</h2>

                <div className='w-[90vw] sm:w-[35vw] flex flex-col items-center justify-center gap-[20px] '>

                    <AppInput label="email" type="email" value={email} onchange={(e) => { setEmail(e.target.value) }} />
                    <AppInput label="password" type={passType} value={password} onchange={(e) => { setPassword(e.target.value) }} />

                    <div className='w-full'>
                        <p className='text-xl'><AppcheckBox title={checkVal ? "Hide Password" : "Show Password"} setCheckVal={setCheckVal} checkVal={checkVal} /></p>
                    </div>
                    <div className='w-full'>
                        <AppButton title='Login' onclick={() => handelLogin()} />
                    </div>

                    <Link to={"/signup"}>dont have an acoount ? <span className='text-sky-400'>Signup</span></Link>

                </div>

            </div>

            <div className="h-full hidden sm:inline-block  sm:w-[35%]">
                <img src={LOGIN_IMG} className="h-full w-full object-cover" />
            </div>
        </div>
    )
}

export default Login