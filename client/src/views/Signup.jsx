import React from 'react'
import SIGNUP_IMG from "../images/signup.jpeg"
import AppInput from '../components/AppInput'
import AppcheckBox from '../components/AppcheckBox'
import AppButton from '../components/AppButton'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className='h-screen w-screen overflow-hidden flex'>


            <div className="h-full hidden sm:inline-block  sm:w-[35%]">
                <img src={SIGNUP_IMG} className="h-full w-full object-cover" />
            </div>


            <div className='w-[100%] sm:w-[65%] h-full flex flex-col items-center'>

                <h2 className='text-[5em] font-bold text-center'>Signup</h2>

                <div className='w-[90vw] sm:w-[35vw] flex flex-col items-center justify-center gap-[10px] '>

                    <AppInput label="name" type="text" />
                    <AppInput label="username" type="email" />
                    <AppInput label="email" type="email" />
                    <AppInput label="password" type="password"/>

                    <div className='w-full'>
                        <p className='text-xl'><AppcheckBox /></p>
                    </div>
                    <div className='w-full'>
                        <AppButton title='Login' />
                    </div>

                    <Link to={"/"}>alredy have an acoount ? <span className='text-sky-400'>Login</span></Link>

                </div>

            </div>


        </div>
    )
}

export default Signup