import React, { useEffect, useState, } from 'react'
import SIGNUP_IMG from "../images/signup.jpeg"
import AppInput from '../components/AppInput'
import AppcheckBox from '../components/AppcheckBox'
import AppButton from '../components/AppButton'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const DBURL = import.meta.env.VITE_SERVER_URI
import { validSignup } from '../utils/validator'

const Signup = () => {
    let navigator = useNavigate()
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passType, setPassType] = useState("password");
    const [checkVal, setCheckVal] = useState(false);

    const handelSignup = async () => {
        let tid = toast.loading("try to signup...")
        try {
             
             
            

            // let response = await axios.post(`${DBURL}/signup`, {
            //     name,
            //     user_name: username,
            //     email,
            //     password
            // },
            //     { withCredentials: true })

            // if (response.data.success) {
            //     toast.dismiss(tid)
            //     toast.success(response.data.message)
            //     navigator("/")
            // }

        } catch (error) {
            toast.dismiss(tid)
            toast.error(error?.response?.data.message)
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


            <div className="h-full hidden sm:inline-block  sm:w-[35%]">
                <img src={SIGNUP_IMG} className="h-full w-full object-cover" />
            </div>


            <div className='w-[100%] sm:w-[65%] h-full flex flex-col items-center'>

                <h2 className='text-[5em] font-bold text-center'>Signup</h2>

                <div className='w-[90vw] sm:w-[35vw] flex flex-col items-center justify-center gap-[10px] '>

                    <AppInput label="name" type="text" value={name} onchange={(e) => { setName(e.target.value) }} />
                    <AppInput label="username" type="text" value={username} onchange={(e) => { setUsername(e.target.value) }} />
                    <AppInput label="email" type="email" value={email} onchange={(e) => { setEmail(e.target.value) }} />
                    <AppInput label="password" type={passType} value={password} onchange={(e) => { setPassword(e.target.value) }} />

                    <div className='w-full'>
                        <p className='text-xl'><AppcheckBox title={checkVal ? "Hide Password" : "Show Password"} setCheckVal={setCheckVal} checkVal={checkVal} /></p>
                    </div>
                    <div className='w-full'>
                        <AppButton title='Signup' onclick={() => handelSignup()} />
                    </div>

                    <Link to={"/"}>alredy have an acoount ? <span className='text-sky-400'>Login</span></Link>

                </div>

            </div>


        </div>
    )
}

export default Signup